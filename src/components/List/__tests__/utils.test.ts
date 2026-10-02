import {isScrollContainer} from '../utils';

// Where a row is and how the list scrolls to it is a matter of layout: that is tested in the
// browser (ListActiveRow.visual.test.tsx), and the rule of the nearest edge — with the helper it
// lives in (utils/__tests__/scrollIntoContainer.test.ts)
describe('List: isScrollContainer', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

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
