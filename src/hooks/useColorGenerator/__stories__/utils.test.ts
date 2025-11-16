import {calculateWCAGContrast, getRelativeLuminance} from './utils';

describe('Data Format', () => {
    describe('getRelativeLuminance', () => {
        it('uppercase hex format -> correct luminance value', () => {
            expect(getRelativeLuminance('#FFFFFF')).toBe(1);
            expect(getRelativeLuminance('#FF0000')).toBeCloseTo(0.2126, 4);
        });

        it('lowercase hex format -> correct luminance value', () => {
            expect(getRelativeLuminance('#ffffff')).toBe(1);
            expect(getRelativeLuminance('#ff0000')).toBeCloseTo(0.2126, 4);
        });

        it('rgb format with spaces -> correct luminance value', () => {
            expect(getRelativeLuminance('rgb(255, 255, 255)')).toBe(1);
            expect(getRelativeLuminance('rgb(0,0,0)')).toBe(0);
            expect(getRelativeLuminance('rgb(255,   0,   0)')).toBeCloseTo(0.2126, 4);
        });

        it('invalid color format -> throws error', () => {
            expect(() => getRelativeLuminance('invalid')).toThrow(
                'Color must be in hex (#RRGGBB) or rgb(r, g, b) format',
            );
            expect(() => getRelativeLuminance('rgba(255, 255, 255, 1)')).toThrow(
                'Color must be in hex (#RRGGBB) or rgb(r, g, b) format',
            );
            expect(() => getRelativeLuminance('#FF')).toThrow(
                'Color must be in hex (#RRGGBB) or rgb(r, g, b) format',
            );
            expect(() => getRelativeLuminance('#GG0000')).toThrow(
                'Color must be in hex (#RRGGBB) or rgb(r, g, b) format',
            );
        });

        it('rgb with out-of-range values -> no error', () => {
            expect(() => getRelativeLuminance('rgb(300, 0, 0)')).not.toThrow(); // Out of range values are handled by browser
        });
    });

    describe('calculateWCAGContrast', () => {
        it('mixed color formats -> correct contrast', () => {
            expect(calculateWCAGContrast('#000000', 'rgb(255, 255, 255)')).toBe(21);
            expect(calculateWCAGContrast('rgb(89, 89, 89)', '#FFFFFF')).toBeCloseTo(7.0, 1);
        });

        it('invalid format for one color -> throws error', () => {
            expect(() => calculateWCAGContrast('invalid', '#FFFFFF')).toThrow();
            expect(() => calculateWCAGContrast('#FFFFFF', 'invalid')).toThrow();
            expect(() => calculateWCAGContrast('#GG0000', '#FFFFFF')).toThrow();
        });
    });
});

describe('Value Accuracy', () => {
    describe('getRelativeLuminance', () => {
        it('black color -> luminance 0', () => {
            expect(getRelativeLuminance('#000000')).toBe(0);
            expect(getRelativeLuminance('rgb(0, 0, 0)')).toBe(0);
        });

        it('white color -> luminance 1', () => {
            expect(getRelativeLuminance('#FFFFFF')).toBe(1);
            expect(getRelativeLuminance('rgb(255, 255, 255)')).toBe(1);
        });

        it('gray colors -> correct luminance by formula', () => {
            // 50% gray
            const gray50Luminance = getRelativeLuminance('#808080');
            expect(gray50Luminance).toBeCloseTo(0.2158605, 6);

            // Light gray
            const lightGrayLuminance = getRelativeLuminance('#C0C0C0');
            expect(lightGrayLuminance).toBeCloseTo(0.5271151, 6);
        });

        it('primary RGB colors -> correct luminance by formula', () => {
            // Pure red
            const redLuminance = getRelativeLuminance('#FF0000');
            expect(redLuminance).toBeCloseTo(0.2126, 4);

            // Pure green
            const greenLuminance = getRelativeLuminance('#00FF00');
            expect(greenLuminance).toBeCloseTo(0.7152, 4);

            // Pure blue
            const blueLuminance = getRelativeLuminance('#0000FF');
            expect(blueLuminance).toBeCloseTo(0.0722, 4);
        });
    });

    describe('calculateWCAGContrast', () => {
        it('different color order -> same contrast', () => {
            const contrast1 = calculateWCAGContrast('#000000', '#FFFFFF');
            const contrast2 = calculateWCAGContrast('#FFFFFF', '#000000');
            expect(contrast1).toBe(contrast2);

            const contrast3 = calculateWCAGContrast('#595959', '#FFFFFF');
            const contrast4 = calculateWCAGContrast('#FFFFFF', '#595959');
            expect(contrast3).toBe(contrast4);
        });

        it('any contrast -> rounded to 2 decimal places', () => {
            const contrast = calculateWCAGContrast('#595959', '#FFFFFF');
            const decimalPlaces = contrast.toString().split('.')[1]?.length || 0;
            expect(decimalPlaces).toBeLessThanOrEqual(2);
        });
    });
});

describe('Contrast Checks for Different Colors', () => {
    describe('calculateWCAGContrast', () => {
        it('black and white colors -> maximum contrast 21', () => {
            expect(calculateWCAGContrast('#000000', '#FFFFFF')).toBe(21);
            expect(calculateWCAGContrast('#FFFFFF', '#000000')).toBe(21);
            expect(calculateWCAGContrast('rgb(0, 0, 0)', 'rgb(255, 255, 255)')).toBe(21);
        });

        it('same colors -> minimum contrast 1', () => {
            expect(calculateWCAGContrast('#FFFFFF', '#FFFFFF')).toBe(1);
            expect(calculateWCAGContrast('#000000', '#000000')).toBe(1);
            expect(calculateWCAGContrast('#808080', '#808080')).toBe(1);
        });

        it('WCAG AA compliant colors (>= 4.5) -> pass standard', () => {
            // Dark gray on white (should be >= 4.5:1 for normal text)
            const darkGrayWhite = calculateWCAGContrast('#595959', '#FFFFFF');
            expect(darkGrayWhite).toBeGreaterThanOrEqual(4.5);
            expect(darkGrayWhite).toBeCloseTo(7.0, 1);

            // Dark blue on white
            const darkBlueWhite = calculateWCAGContrast('#0066CC', '#FFFFFF');
            expect(darkBlueWhite).toBeGreaterThanOrEqual(4.5);
            expect(darkBlueWhite).toBeCloseTo(5.57, 1);
        });

        it('WCAG AAA compliant colors (>= 7) -> pass standard', () => {
            // Very dark gray on white (should be >= 7:1 for normal text)
            const veryDarkGrayWhite = calculateWCAGContrast('#3A3A3A', '#FFFFFF');
            expect(veryDarkGrayWhite).toBeGreaterThanOrEqual(7);
            expect(veryDarkGrayWhite).toBeCloseTo(11.37, 1);
        });

        it('WCAG AA non-compliant colors (< 4.5) -> fail standard', () => {
            // Light gray on white (fails WCAG AA)
            const lightGrayWhite = calculateWCAGContrast('#CCCCCC', '#FFFFFF');
            expect(lightGrayWhite).toBeLessThan(4.5);
            expect(lightGrayWhite).toBeCloseTo(1.6, 1);

            // Light blue on white (fails WCAG AA)
            const lightBlueWhite = calculateWCAGContrast('#6699CC', '#FFFFFF');
            expect(lightBlueWhite).toBeLessThan(4.5);
            expect(lightBlueWhite).toBeCloseTo(3.0, 1);
        });
    });
});
