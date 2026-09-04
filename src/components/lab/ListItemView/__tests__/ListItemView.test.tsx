import userEvent from '@testing-library/user-event';
import * as tabbable from 'tabbable';

import {render, screen} from '../../../../../test-utils/utils';
import {ListItemView} from '../ListItemView';

// jsdom has no layout: by default displayCheck considers every element hidden,
// and focusable() returns an empty list. jest.mock does not fit: the module is
// already cached by the test setup (the src barrel loads tabbable earlier)
const realFocusable = tabbable.focusable;
let focusableSpy: jest.SpyInstance;

beforeAll(() => {
    focusableSpy = jest
        .spyOn(tabbable, 'focusable')
        .mockImplementation((container, options) =>
            realFocusable(container, {...options, displayCheck: 'none'}),
        );
});

afterAll(() => {
    focusableSpy.mockRestore();
});

describe('lab ListItemView', () => {
    describe('DOM props pass-through', () => {
        test('passes role, tabIndex, aria-*, id and data-* to the root node', () => {
            render(
                <ListItemView
                    id="item-1"
                    role="option"
                    tabIndex={0}
                    aria-disabled={true}
                    data-active=""
                    data-qa="view"
                >
                    Item
                </ListItemView>,
            );

            const item = screen.getByRole('option');
            expect(item).toHaveAttribute('id', 'item-1');
            expect(item).toHaveAttribute('tabindex', '0');
            expect(item).toHaveAttribute('aria-disabled', 'true');
            expect(item).toHaveAttribute('data-active');
            expect(item).toHaveAttribute('data-qa', 'view');
        });

        test('passes pointer handlers to the root node', async () => {
            const user = userEvent.setup();
            const onPointerEnter = jest.fn();
            render(
                <ListItemView role="option" onPointerEnter={onPointerEnter}>
                    Item
                </ListItemView>,
            );

            await user.hover(screen.getByRole('option'));

            expect(onPointerEnter).toHaveBeenCalledTimes(1);
        });
    });

    describe('state modifiers', () => {
        // The cascade fix of the selected+active pair: an element with both
        // modifiers must resolve its background to selection-hover (the :focus
        // fallback is gone — the indication is owned by the states)
        test('selected + active render both modifiers on the root node', () => {
            render(
                <ListItemView role="option" selected selectionStyle="highlight" active>
                    Item
                </ListItemView>,
            );
            const item = screen.getByRole('option');
            expect(item).toHaveClass('g-lab-list-item-view_selected');
            expect(item).toHaveClass('g-lab-list-item-view_active');
        });
    });

    describe('click composition', () => {
        test('calls onClick on a click by the row', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <ListItemView role="option" onClick={onClick}>
                    Item
                </ListItemView>,
            );

            await user.click(screen.getByRole('option'));

            expect(onClick).toHaveBeenCalledTimes(1);
        });

        test('does not call onClick on a click by a focusable descendant', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            const onInnerClick = jest.fn();
            render(
                <ListItemView
                    role="option"
                    onClick={onClick}
                    endContent={
                        <button type="button" onClick={onInnerClick}>
                            Inner
                        </button>
                    }
                >
                    Item
                </ListItemView>,
            );

            await user.click(screen.getByRole('button', {name: 'Inner'}));

            expect(onInnerClick).toHaveBeenCalledTimes(1);
            expect(onClick).not.toHaveBeenCalled();
        });

        test('does not call onClick when disabled', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <ListItemView role="option" disabled onClick={onClick}>
                    Item
                </ListItemView>,
            );

            await user.click(screen.getByRole('option'));

            expect(onClick).not.toHaveBeenCalled();
        });
    });

    describe('componentProps path (Menu contract)', () => {
        test('renders a custom component and merges componentProps', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(
                <ListItemView
                    isContainer
                    component="button"
                    componentProps={{type: 'button', onClick, className: 'custom'}}
                >
                    Item
                </ListItemView>,
            );

            const item = screen.getByRole('button');
            expect(item).toHaveClass('custom');

            await user.click(item);
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });
});
