import {hexToOpacity, normalizeHex, opacityToHex, validAlpha} from '../utils';

describe('ColorPicker utils', () => {
    describe('validAlpha', () => {
        it('should return 100 for null values', () => {
            expect(validAlpha(null)).toBe(100);
        });

        it('should return 100 for undefined values', () => {
            expect(validAlpha(undefined as any)).toBe(100);
        });

        it('should return 100 for NaN values', () => {
            expect(validAlpha(NaN)).toBe(100);
        });

        it('should return 100 for values greater than 100', () => {
            expect(validAlpha(150)).toBe(100);
            expect(validAlpha(101)).toBe(100);
        });

        it('should return 0 for negative values', () => {
            expect(validAlpha(-1)).toBe(0);
            expect(validAlpha(-50)).toBe(0);
        });

        it('should return the value for valid range (0-100)', () => {
            expect(validAlpha(0)).toBe(0);
            expect(validAlpha(50)).toBe(50);
            expect(validAlpha(100)).toBe(100);
            expect(validAlpha(25.5)).toBe(25.5);
        });
    });

    describe('normalizeHex', () => {
        it('should normalize valid hex colors', () => {
            expect(normalizeHex('#f00')).toBe('#ff0000');
            expect(normalizeHex('#ff0000')).toBe('#ff0000');
            expect(normalizeHex('red')).toBe('#ff0000');
        });

        it('should return default color for invalid hex', () => {
            expect(normalizeHex('invalid')).toBe('#000000');
            expect(normalizeHex('')).toBe('#000000');
            expect(normalizeHex('xyz')).toBe('#000000');
        });
    });

    describe('hexToOpacity', () => {
        it('should extract opacity from hex with alpha', () => {
            expect(hexToOpacity('#ff000080')).toBe(50); // 50% opacity
            expect(hexToOpacity('#ff0000ff')).toBe(100); // 100% opacity
            expect(hexToOpacity('#ff000000')).toBe(0); // 0% opacity
        });

        it('should return 100 for hex without alpha', () => {
            expect(hexToOpacity('#ff0000')).toBe(100);
            expect(hexToOpacity('#f00')).toBe(100);
        });
    });

    describe('opacityToHex', () => {
        it('should apply opacity to hex color', () => {
            const result = opacityToHex('#ff0000', 50);
            expect(result).toMatch(/^#ff000080$/i);
        });

        it('should handle edge cases for opacity values', () => {
            // Opacity should be clamped to 0-100 range
            const result1 = opacityToHex('#ff0000', -10);
            expect(hexToOpacity(result1)).toBe(0);

            const result2 = opacityToHex('#ff0000', 150);
            expect(hexToOpacity(result2)).toBe(100);
        });

        it('should handle 0 and 100 opacity correctly', () => {
            const transparent = opacityToHex('#ff0000', 0);
            expect(hexToOpacity(transparent)).toBe(0);

            const opaque = opacityToHex('#ff0000', 100);
            expect(hexToOpacity(opaque)).toBe(100);
        });
    });
});
