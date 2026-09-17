import * as React from 'react';

import {act, fireEvent, render, screen} from '../../../../test-utils/utils';
import {getItemDomId} from '../../lab/List/utils';
import {useAlignActiveOption} from '../hooks';
import type {SelectOption} from '../types';

const LIST_ID = 'list';
const CONTAINER_QA = 'container';
const ROW = 20;
const VIEWPORT = 100;
const getItemHeight = () => ROW;
const ROWS: SelectOption[] = Array.from({length: 20}, (_, index) => ({
    value: `v${index}`,
    content: `Value ${index}`,
}));

/** The rows the harness renders; the rest live only in `ROWS`, as under virtualization */
function Harness({
    activeItemId,
    renderedCount = ROWS.length,
    offset = 0,
}: {
    activeItemId?: string;
    renderedCount?: number;
    /** Rows that appeared above push the rest down, exactly as they do in a list */
    offset?: number;
}) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    // A new array on every offset: the rows of the list changed, the active option did not
    const rows = React.useMemo(() => [...ROWS], [offset]);

    useAlignActiveOption({
        listId: LIST_ID,
        containerRef,
        activeItemId,
        rows,
        getItemHeight,
    });

    return (
        <div ref={containerRef} data-qa={CONTAINER_QA}>
            {ROWS.slice(0, renderedCount).map((row, index) => (
                <div
                    key={row.value}
                    id={getItemDomId(LIST_ID, row.value)}
                    data-top={offset + index * ROW}
                />
            ))}
        </div>
    );
}

const isContainer = (element: HTMLElement) => element.dataset.qa === CONTAINER_QA;
const topOf = (element: HTMLElement) => Number(element.dataset.top ?? 0);

describe('Select: useAlignActiveOption', () => {
    let frames: FrameRequestCallback[];
    let rafSpy: jest.SpyInstance;
    let cafSpy: jest.SpyInstance;
    let spies: jest.SpyInstance[];

    /** Runs the frame the loop has queued, if any */
    const runFrame = () => {
        const frame = frames.shift();
        expect(frame).toBeDefined();
        act(() => {
            frame?.(0);
        });
    };

    const container = () => screen.getByTestId(CONTAINER_QA);

    beforeEach(() => {
        frames = [];
        rafSpy = jest
            .spyOn(window, 'requestAnimationFrame')
            .mockImplementation((callback: FrameRequestCallback) => {
                frames.push(callback);
                // A handle of its own, so that a test about cancelling means something
                return 1000 + frames.length;
            });
        cafSpy = jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});

        // jsdom has no layout: the container is the viewport, a row sits where its `data-top` says
        spies = [
            jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (
                this: HTMLElement,
            ) {
                return isContainer(this) ? VIEWPORT : ROW;
            }),
            jest.spyOn(HTMLElement.prototype, 'offsetTop', 'get').mockImplementation(function (
                this: HTMLElement,
            ) {
                return isContainer(this) ? 0 : topOf(this);
            }),
            jest.spyOn(HTMLElement.prototype, 'offsetParent', 'get').mockImplementation(function (
                this: HTMLElement,
            ) {
                return this.parentElement;
            }),
            jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
                this: HTMLElement,
            ) {
                const top = isContainer(this)
                    ? 0
                    : topOf(this) - (this.parentElement?.scrollTop ?? 0);
                const height = isContainer(this) ? VIEWPORT : ROW;
                return {top, bottom: top + height, height} as DOMRect;
            }),
        ];
    });

    afterEach(() => {
        rafSpy.mockRestore();
        cafSpy.mockRestore();
        spies.forEach((spy) => spy.mockRestore());
    });

    test('a row below the viewport is brought to its bottom edge', () => {
        render(<Harness activeItemId="v9" />);

        // The row spans 180..200, the viewport is 100 tall
        expect(container().scrollTop).toBe(100);
    });

    test('a row that is not rendered yet is scrolled to by the heights of the rows', () => {
        // Under virtualization the first window starts at the top of the list: the row has no DOM
        // node, and the offset is summed from the heights the virtualizer is given
        render(<Harness activeItemId="v9" renderedCount={3} />);

        expect(container().scrollTop).toBe(100);
    });

    test('a row already in view is left where it is', () => {
        const {rerender} = render(<Harness activeItemId="v9" />);
        expect(container().scrollTop).toBe(100);

        // v6 spans 120..140 — inside the 100..200 viewport, so nothing moves
        rerender(<Harness activeItemId="v6" />);

        expect(container().scrollTop).toBe(100);
    });

    test('the alignment repeats while the virtualizer keeps correcting the rows', () => {
        render(<Harness activeItemId="v9" />);
        expect(container().scrollTop).toBe(100);

        // The virtualizer measured the rows and the content shifted: the row is 40px lower now.
        // The list does not re-render on that — the next frame of the watch is what catches it
        const row = document.getElementById(getItemDomId(LIST_ID, 'v9')) as HTMLElement;
        row.dataset.top = String(9 * ROW + 40);

        runFrame();

        expect(container().scrollTop).toBe(140);
    });

    test('rows that moved start the watch again', () => {
        const {rerender} = render(<Harness activeItemId="v9" />);
        expect(container().scrollTop).toBe(100);

        // Rows appeared above the active one: it is 40px lower now, and its id did not change
        rerender(<Harness activeItemId="v9" offset={40} />);

        expect(container().scrollTop).toBe(140);
    });

    test('rows that arrive while the reader is scrolling are left alone', () => {
        const {rerender} = render(<Harness activeItemId="v9" />);
        expect(container().scrollTop).toBe(100);

        // The reader scrolled somewhere of their own — to the loader at the bottom, say — and then
        // the next page arrived: the rows are new, the active option is the same
        container().scrollTop = 0;
        rerender(<Harness activeItemId="v9" offset={40} />);

        expect(container().scrollTop).toBe(0);
    });

    test('an option made active by the pointer does not move the list', () => {
        // v3 is inside the viewport, so nothing is scrolled to begin with
        const {rerender} = render(<Harness activeItemId="v3" />);
        expect(container().scrollTop).toBe(0);

        // The pointer is over the list: a row it makes active must not pull the rows under it
        fireEvent.pointerEnter(container());
        rerender(<Harness activeItemId="v9" />);
        expect(container().scrollTop).toBe(0);

        // With the pointer gone the activity moves the list again
        fireEvent.pointerLeave(container());
        rerender(<Harness activeItemId="v12" />);
        expect(container().scrollTop).toBe(13 * ROW - VIEWPORT);
    });

    test('the watch ends after three quiet frames', () => {
        render(<Harness activeItemId="v9" />);

        // The first alignment is synchronous, two more frames confirm the row has settled
        runFrame();
        runFrame();

        expect(frames).toHaveLength(0);
        expect(rafSpy).toHaveBeenCalledTimes(2);
    });

    test('a list that never settles gives the watch up', () => {
        // The row is never inside the viewport: the container answers with a rect of its own height
        // while the row keeps reporting itself below it
        spies.push(
            jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
                this: HTMLElement,
            ) {
                return isContainer(this)
                    ? ({top: 0, bottom: VIEWPORT, height: VIEWPORT} as DOMRect)
                    : ({top: VIEWPORT + 1, bottom: VIEWPORT + 1 + ROW, height: ROW} as DOMRect);
            }),
        );

        render(<Harness activeItemId="v9" />);

        while (frames.length > 0) {
            runFrame();
        }

        expect(rafSpy).toHaveBeenCalledTimes(20);
    });

    test('the queued frame is cancelled when the list goes away', () => {
        const {unmount} = render(<Harness activeItemId="v9" />);
        expect(frames).toHaveLength(1);

        unmount();

        expect(cafSpy).toHaveBeenCalledWith(rafSpy.mock.results[0].value);
    });

    test('a closed list is not aligned at all', () => {
        render(<Harness />);

        expect(container().scrollTop).toBe(0);
        expect(rafSpy).not.toHaveBeenCalled();
    });
});
