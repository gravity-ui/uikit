import {getNearestEdgeScrollOffset} from '../scrollIntoContainer';

const VIEWPORT = 100;

const getOffset = (start: number, end: number, scrollOffset: number) =>
    getNearestEdgeScrollOffset({start, end, scrollOffset, viewportSize: VIEWPORT});

describe('getNearestEdgeScrollOffset', () => {
    test('a row below the viewport is brought to its bottom edge', () => {
        expect(getOffset(180, 200, 0)).toBe(100);
    });

    test('a row above the viewport is brought to its top edge', () => {
        expect(getOffset(60, 80, 200)).toBe(60);
    });

    test('a row in view is left where it is', () => {
        expect(getOffset(120, 140, 100)).toBeUndefined();
        // Flush with either edge
        expect(getOffset(100, 120, 100)).toBeUndefined();
        expect(getOffset(180, 200, 100)).toBeUndefined();
    });

    test('a row cut by an edge is brought in by that edge', () => {
        expect(getOffset(80, 100, 90)).toBe(80);
        expect(getOffset(180, 200, 90)).toBe(100);
    });

    test('a fraction of a pixel does not count', () => {
        expect(getOffset(100, 120, 100.5)).toBeUndefined();
        expect(getOffset(180, 200, 99.5)).toBeUndefined();
    });

    test('a row taller than the viewport shows its start from below and its end from above', () => {
        expect(getOffset(150, 300, 0)).toBe(150);
        expect(getOffset(150, 300, 400)).toBe(200);
    });

    test('a row taller than the viewport that covers it is left where it is', () => {
        expect(getOffset(150, 300, 170)).toBeUndefined();
    });
});
