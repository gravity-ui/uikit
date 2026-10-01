import {isRowInView, isScrollContainer, scrollRowIntoView} from '../utils';

const VIEWPORT = 100;
const ROW = 20;

/** jsdom has no layout: the geometry of an element is what the test says it is */
function setLayout(
    element: HTMLElement,
    layout: {
        offsetTop?: number;
        offsetHeight?: number;
        offsetParent?: HTMLElement | null;
        clientTop?: number;
    },
) {
    for (const [key, value] of Object.entries(layout)) {
        Object.defineProperty(element, key, {configurable: true, value});
    }
}

/** A root with rows in flow: the root is the offset parent of every row */
function createList({count = 20, rowHeight = ROW}: {count?: number; rowHeight?: number} = {}) {
    const container = document.createElement('div');
    setLayout(container, {offsetHeight: VIEWPORT, offsetTop: 0, offsetParent: document.body});
    const rows = Array.from({length: count}, (_, index) => {
        const row = document.createElement('div');
        setLayout(row, {
            offsetTop: index * rowHeight,
            offsetHeight: rowHeight,
            offsetParent: container,
        });
        container.appendChild(row);
        return row;
    });
    document.body.appendChild(container);
    return {container, rows};
}

afterEach(() => {
    document.body.innerHTML = '';
});

describe('List: scrollRowIntoView', () => {
    test('a row below the viewport is brought to its bottom edge', () => {
        const {container, rows} = createList();

        // The row spans 180..200, the viewport is 100 tall
        scrollRowIntoView(container, rows[9]);

        expect(container.scrollTop).toBe(100);
    });

    test('a row above the viewport is brought to its top edge', () => {
        const {container, rows} = createList();
        container.scrollTop = 200;

        scrollRowIntoView(container, rows[3]);

        expect(container.scrollTop).toBe(60);
    });

    test('a row already in view is left where it is', () => {
        const {container, rows} = createList();
        container.scrollTop = 100;

        // The row spans 120..140 — inside the 100..200 viewport
        scrollRowIntoView(container, rows[6]);

        expect(container.scrollTop).toBe(100);
    });

    test('a row cut by an edge is brought in by that edge', () => {
        const {container, rows} = createList();
        container.scrollTop = 90;

        // The row spans 80..100: its upper half is above the viewport
        scrollRowIntoView(container, rows[4]);
        expect(container.scrollTop).toBe(80);

        // The row spans 180..200: its lower half is below the 80..180 viewport
        scrollRowIntoView(container, rows[9]);
        expect(container.scrollTop).toBe(100);
    });

    test('a row taller than the root shows its start when it comes from below', () => {
        const {container, rows} = createList({count: 5, rowHeight: 150});

        // The row spans 150..300
        scrollRowIntoView(container, rows[1]);

        expect(container.scrollTop).toBe(150);
    });

    test('a row taller than the root that covers it is left where it is', () => {
        const {container, rows} = createList({count: 5, rowHeight: 150});
        container.scrollTop = 170;

        scrollRowIntoView(container, rows[1]);

        expect(container.scrollTop).toBe(170);
    });

    test('the offset is summed along the offsetParent chain', () => {
        // Under virtualization a row sits in an absolutely positioned wrapper inside the sizer
        const container = document.createElement('div');
        const sizer = document.createElement('div');
        const wrapper = document.createElement('div');
        const row = document.createElement('div');
        container.appendChild(sizer);
        sizer.appendChild(wrapper);
        wrapper.appendChild(row);
        document.body.appendChild(container);
        setLayout(container, {offsetHeight: VIEWPORT, offsetTop: 0, offsetParent: document.body});
        // 4 is the padding of the root above the sizer
        setLayout(sizer, {offsetTop: 4, offsetParent: container});
        setLayout(wrapper, {offsetTop: 400, offsetParent: sizer});
        setLayout(row, {offsetTop: 0, offsetHeight: ROW, offsetParent: wrapper});

        scrollRowIntoView(container, row);

        expect(container.scrollTop).toBe(4 + 400 + ROW - VIEWPORT);
    });

    test('a root that is not positioned is not counted twice', () => {
        // The rows of such a root are offset from an ancestor of the root: the chain steps over
        // the root, and what the root itself is offset by is not a part of the way to the row
        const page = document.createElement('div');
        const container = document.createElement('div');
        const row = document.createElement('div');
        page.appendChild(container);
        container.appendChild(row);
        document.body.appendChild(page);
        setLayout(page, {offsetTop: 0, offsetParent: document.body});
        setLayout(container, {
            offsetHeight: VIEWPORT,
            offsetTop: 300,
            clientTop: 1,
            offsetParent: page,
        });
        // 300 down to the root, its 1px border, then 180 inside it
        setLayout(row, {offsetTop: 481, offsetHeight: ROW, offsetParent: page});

        scrollRowIntoView(container, row);

        expect(container.scrollTop).toBe(180 + ROW - VIEWPORT);
    });
});

describe('List: isRowInView', () => {
    test('tells a row inside the viewport from a row outside of it', () => {
        const {container, rows} = createList();
        container.scrollTop = 100;

        expect(isRowInView(container, rows[5])).toBe(true);
        expect(isRowInView(container, rows[9])).toBe(true);
        expect(isRowInView(container, rows[4])).toBe(false);
        expect(isRowInView(container, rows[10])).toBe(false);
    });

    test('a row cut by an edge is not in view', () => {
        const {container, rows} = createList();
        container.scrollTop = 110;

        expect(isRowInView(container, rows[5])).toBe(false);
        expect(isRowInView(container, rows[10])).toBe(false);
    });

    test('a fraction of a pixel does not count', () => {
        const {container, rows} = createList();
        container.scrollTop = 100.5;

        expect(isRowInView(container, rows[5])).toBe(true);
    });

    test('a row taller than the root is in view once it covers the root', () => {
        const {container, rows} = createList({count: 5, rowHeight: 150});

        container.scrollTop = 170;
        expect(isRowInView(container, rows[1])).toBe(true);

        container.scrollTop = 100;
        expect(isRowInView(container, rows[1])).toBe(false);
    });
});

describe('List: isScrollContainer', () => {
    test('a root that clips its rows is one, a root laid out at its full height is not', () => {
        const scrolling = document.createElement('div');
        scrolling.style.overflowY = 'auto';
        const hidden = document.createElement('div');
        hidden.style.overflowY = 'hidden';
        const plain = document.createElement('div');
        document.body.append(scrolling, hidden, plain);

        expect(isScrollContainer(scrolling)).toBe(true);
        expect(isScrollContainer(hidden)).toBe(true);
        expect(isScrollContainer(plain)).toBe(false);
    });
});
