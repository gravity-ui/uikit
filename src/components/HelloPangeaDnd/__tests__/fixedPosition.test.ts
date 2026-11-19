import {toContainingBlock} from '../fixedPosition';

function mount(parentStyle: string) {
    const block = document.createElement('div');
    block.setAttribute('style', parentStyle);
    const parent = document.createElement('div');
    block.appendChild(parent);
    document.body.appendChild(block);
    jest.spyOn(block, 'getBoundingClientRect').mockReturnValue({
        top: 300,
        left: 20,
    } as DOMRect);
    return {block, parent};
}

describe('toContainingBlock', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    const dragging = {position: 'fixed', top: 350, left: 30, width: 200} as const;

    test.each([
        ['transform', 'transform: translateY(10px)'],
        ['will-change', 'will-change: transform'],
        ['filter', 'filter: blur(1px)'],
    ])('%s of an ancestor: its offset is taken out', (_name, style) => {
        const {parent} = mount(style);
        expect(toContainingBlock(dragging, parent)).toEqual({...dragging, top: 50, left: 10});
    });

    test('without such an ancestor the viewport stays the containing block', () => {
        const {parent} = mount('');
        expect(toContainingBlock(dragging, parent)).toBe(dragging);
    });

    test('the scroll of the containing block is added', () => {
        const {block, parent} = mount('transform: translateY(10px); overflow: auto');
        block.scrollTop = 40;
        expect(toContainingBlock(dragging, parent)).toMatchObject({top: 90});
    });

    test('a row at rest is left as is', () => {
        const {parent} = mount('transform: translateY(10px)');
        const resting = {transform: 'translate(0px, 28px)'};
        expect(toContainingBlock(resting, parent)).toBe(resting);
    });
});
