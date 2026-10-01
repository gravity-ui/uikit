import userEvent from '@testing-library/user-event';

import {fireEvent, render, screen} from '../../../../test-utils/utils';
import {List} from '../List';
import type {ListProps} from '../types';

import {mockLayout, mockOffsets, mockTabbableDisplayCheck, scrollTo} from './helpers';

const VIEWPORT = 100;
const ROW = 20;

mockTabbableDisplayCheck();
mockLayout({viewport: VIEWPORT, row: ROW});
mockOffsets({row: ROW});

const ITEMS = Array.from({length: 50}, (_, index) => `Item ${index + 1}`);
const EARLIER = Array.from({length: 10}, (_, index) => `Earlier ${index + 1}`);

/** The offset that leaves the row with this number (from 1) at the bottom edge of the root */
const bottomAligned = (position: number) => position * ROW - VIEWPORT;

/** The root is the scroll container: its height is limited and it clips its rows */
function ScrollingList(props: Partial<ListProps<string>>) {
    return (
        <List
            aria-label="Items"
            items={ITEMS}
            style={{maxHeight: VIEWPORT, overflowY: 'auto'}}
            {...props}
        />
    );
}

describe('List: the active row is kept in view', () => {
    describe('what scrolls', () => {
        test('mounting with an active row far below brings it into view', () => {
            render(<ScrollingList defaultActiveItemId="Item 40" />);

            expect(screen.getByRole('listbox').scrollTop).toBe(bottomAligned(40));
        });

        test('a controlled change brings the row into view by the nearest edge', () => {
            const {rerender} = render(<ScrollingList activeItemId="Item 1" />);
            const listbox = screen.getByRole('listbox');
            expect(listbox.scrollTop).toBe(0);

            rerender(<ScrollingList activeItemId="Item 40" />);
            expect(listbox.scrollTop).toBe(bottomAligned(40));

            // A row above the viewport comes in by the top edge
            rerender(<ScrollingList activeItemId="Item 3" />);
            expect(listbox.scrollTop).toBe(2 * ROW);
        });

        test('a row already in view is left where it is', () => {
            const {rerender} = render(<ScrollingList activeItemId="Item 40" />);
            const listbox = screen.getByRole('listbox');

            // Item 38 spans 740..760 — inside the 700..800 viewport
            rerender(<ScrollingList activeItemId="Item 38" />);

            expect(listbox.scrollTop).toBe(bottomAligned(40));
        });

        test('the keyboard scrolls the root and leaves the page alone', async () => {
            const scrollIntoViewMock = jest.fn();
            HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
            try {
                const user = userEvent.setup();
                render(<ScrollingList />);

                await user.tab();
                await user.keyboard('{End}');

                expect(screen.getByRole('option', {name: 'Item 50'})).toHaveFocus();
                expect(screen.getByRole('listbox').scrollTop).toBe(bottomAligned(50));
                expect(scrollIntoViewMock).not.toHaveBeenCalled();
            } finally {
                delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
            }
        });

        test('typeahead scrolls the root', async () => {
            const user = userEvent.setup();
            render(<ScrollingList />);

            await user.tab();
            await user.keyboard('Item 40');

            expect(screen.getByRole('option', {name: 'Item 40'})).toHaveAttribute('data-active');
            expect(screen.getByRole('listbox').scrollTop).toBe(bottomAligned(40));
        });
    });

    describe('the pointer does not scroll', () => {
        test('a row activated by hover stays where it is', async () => {
            const user = userEvent.setup();
            render(<ScrollingList />);

            // jsdom renders every row: the one hovered is far below the viewport
            await user.hover(screen.getByRole('option', {name: 'Item 40'}));

            expect(screen.getByRole('option', {name: 'Item 40'})).toHaveAttribute('data-active');
            expect(screen.getByRole('listbox').scrollTop).toBe(0);
        });

        test('a row activated by a click stays where it is', () => {
            render(<ScrollingList />);

            // A tap: the click arrives after the pointer has left the list already
            fireEvent.click(screen.getByRole('option', {name: 'Item 40'}));

            expect(screen.getByRole('option', {name: 'Item 40'})).toHaveAttribute('data-active');
            expect(screen.getByRole('listbox').scrollTop).toBe(0);
        });

        test('a controlled change does not move the rows under the pointer', async () => {
            const user = userEvent.setup();
            const {rerender} = render(
                <ScrollingList activeItemId="Item 1" activateOnHover={false} />,
            );
            const listbox = screen.getByRole('listbox');

            await user.hover(screen.getByRole('option', {name: 'Item 2'}));
            rerender(<ScrollingList activeItemId="Item 40" activateOnHover={false} />);
            expect(listbox.scrollTop).toBe(0);

            // With the pointer gone the activity moves the list again
            await user.unhover(screen.getByRole('option', {name: 'Item 2'}));
            rerender(<ScrollingList activeItemId="Item 45" activateOnHover={false} />);
            expect(listbox.scrollTop).toBe(bottomAligned(45));
        });

        test('a key pressed while the pointer is over the list scrolls it all the same', async () => {
            const user = userEvent.setup();
            render(<ScrollingList activateOnHover={false} />);

            await user.tab();
            await user.hover(screen.getByRole('option', {name: 'Item 2'}));
            await user.keyboard('{End}');

            expect(screen.getByRole('listbox').scrollTop).toBe(bottomAligned(50));
        });
    });

    describe('rows that change under the same active row', () => {
        test('rows inserted above the active row bring it back into view', () => {
            const {rerender} = render(<ScrollingList defaultActiveItemId="Item 40" />);
            const listbox = screen.getByRole('listbox');
            expect(listbox.scrollTop).toBe(bottomAligned(40));

            rerender(
                <ScrollingList defaultActiveItemId="Item 40" items={[...EARLIER, ...ITEMS]} />,
            );

            expect(listbox.scrollTop).toBe(bottomAligned(40 + EARLIER.length));
        });

        test('a reader who scrolled away from the active row is not thrown back', () => {
            const {rerender} = render(<ScrollingList defaultActiveItemId="Item 40" />);
            const listbox = screen.getByRole('listbox');

            // To the top of the list, say — and then the rows change
            scrollTo(listbox, 0);
            rerender(
                <ScrollingList defaultActiveItemId="Item 40" items={[...EARLIER, ...ITEMS]} />,
            );

            expect(listbox.scrollTop).toBe(0);
        });

        test('a reader who scrolled but still sees the active row has it kept in view', () => {
            const {rerender} = render(<ScrollingList defaultActiveItemId="Item 40" />);
            const listbox = screen.getByRole('listbox');

            // Item 40 spans 780..800 — still inside the 720..820 viewport
            scrollTo(listbox, 720);
            rerender(
                <ScrollingList defaultActiveItemId="Item 40" items={[...EARLIER, ...ITEMS]} />,
            );

            expect(listbox.scrollTop).toBe(bottomAligned(40 + EARLIER.length));
        });

        test('a row the pointer activated is brought back as well', async () => {
            const user = userEvent.setup();
            const {rerender} = render(<ScrollingList />);
            const listbox = screen.getByRole('listbox');

            // Item 3 spans 40..60 — in view, and the hover leaves the scroll where it was
            await user.hover(screen.getByRole('option', {name: 'Item 3'}));
            expect(listbox.scrollTop).toBe(0);

            rerender(<ScrollingList items={[...EARLIER, ...ITEMS]} />);

            expect(listbox.scrollTop).toBe(bottomAligned(3 + EARLIER.length));
        });
    });

    describe('a root that does not scroll', () => {
        let scrollIntoViewMock: jest.Mock;

        beforeEach(() => {
            scrollIntoViewMock = jest.fn();
            HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
        });

        afterEach(() => {
            delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
        });

        test('the keyboard shows the row with the page', async () => {
            const user = userEvent.setup();
            render(<List aria-label="Items" items={ITEMS} />);

            await user.tab();
            await user.keyboard('{End}');

            expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
            expect(scrollIntoViewMock).toHaveBeenCalledWith({block: 'nearest'});
            expect(scrollIntoViewMock.mock.instances[0]).toBe(
                screen.getByRole('option', {name: 'Item 50'}),
            );
        });

        test('nothing but the keyboard moves the page', () => {
            const {rerender} = render(
                <List aria-label="Items" items={ITEMS} activeItemId="Item 40" />,
            );

            rerender(<List aria-label="Items" items={ITEMS} activeItemId="Item 10" />);
            rerender(
                <List aria-label="Items" items={[...EARLIER, ...ITEMS]} activeItemId="Item 10" />,
            );

            expect(scrollIntoViewMock).not.toHaveBeenCalled();
        });
    });
});
