import {generateColor, linearToSrgb, oklchToRgb} from './color';

describe('color utilities', () => {
    describe('linearToSrgb', () => {
        it('should handle small values correctly', () => {
            expect(linearToSrgb(0)).toBe(0);
            expect(linearToSrgb(0.001)).toBeCloseTo(0.01292);
        });

        it('should handle values above threshold correctly', () => {
            expect(linearToSrgb(0.5)).toBeCloseTo(0.7353569830524495);
            expect(linearToSrgb(1)).toBeCloseTo(1);
        });

        it('should handle edge case at threshold', () => {
            const threshold = 0.0031308;
            const result = linearToSrgb(threshold);
            expect(result).toBeCloseTo(0.04045, 4);
        });
    });

    describe('oklchToRgb', () => {
        it('should return valid RGB values in range [0, 255]', () => {
            const [r, g, b] = oklchToRgb(0.5, 0.1, 180);

            expect(r).toBeGreaterThanOrEqual(0);
            expect(r).toBeLessThanOrEqual(255);
            expect(g).toBeGreaterThanOrEqual(0);
            expect(g).toBeLessThanOrEqual(255);
            expect(b).toBeGreaterThanOrEqual(0);
            expect(b).toBeLessThanOrEqual(255);

            expect(Number.isInteger(r)).toBe(true);
            expect(Number.isInteger(g)).toBe(true);
            expect(Number.isInteger(b)).toBe(true);
        });

        it('should handle pure black (L=0)', () => {
            const [r, g, b] = oklchToRgb(0, 0, 0);
            expect(r).toBe(0);
            expect(g).toBe(0);
            expect(b).toBe(0);
        });

        it('should handle pure white (L=1)', () => {
            const [r, g, b] = oklchToRgb(1, 0, 0);
            expect(r).toBe(255);
            expect(g).toBe(255);
            expect(b).toBe(255);
        });

        it('should handle extreme chroma values without producing negative RGB', () => {
            // Test with high chroma that might produce out-of-gamut colors
            const [r, g, b] = oklchToRgb(0.5, 0.5, 120);

            expect(r).toBeGreaterThanOrEqual(0);
            expect(r).toBeLessThanOrEqual(255);
            expect(g).toBeGreaterThanOrEqual(0);
            expect(g).toBeLessThanOrEqual(255);
            expect(b).toBeGreaterThanOrEqual(0);
            expect(b).toBeLessThanOrEqual(255);
        });

        it('should handle different hue values', () => {
            const hues = [0, 60, 120, 180, 240, 300];

            hues.forEach((hue) => {
                const [r, g, b] = oklchToRgb(0.5, 0.1, hue);

                expect(r).toBeGreaterThanOrEqual(0);
                expect(r).toBeLessThanOrEqual(255);
                expect(g).toBeGreaterThanOrEqual(0);
                expect(g).toBeLessThanOrEqual(255);
                expect(b).toBeGreaterThanOrEqual(0);
                expect(b).toBeLessThanOrEqual(255);
            });
        });

        it('should produce consistent results for same input', () => {
            const [r1, g1, b1] = oklchToRgb(0.7, 0.15, 45);
            const [r2, g2, b2] = oklchToRgb(0.7, 0.15, 45);

            expect(r1).toBe(r2);
            expect(g1).toBe(g2);
            expect(b1).toBe(b2);
        });

        it('should handle edge cases that might produce negative linear RGB', () => {
            // These combinations might produce negative linear RGB values
            const edgeCases = [
                [0.1, 0.3, 180], // Low lightness, high chroma
                [0.9, 0.4, 270], // High lightness, high chroma
                [0.3, 0.5, 60], // Medium lightness, very high chroma
            ] as const;

            edgeCases.forEach(([l, c, h]) => {
                const [r, g, b] = oklchToRgb(l, c, h);

                expect(r).toBeGreaterThanOrEqual(0);
                expect(r).toBeLessThanOrEqual(255);
                expect(g).toBeGreaterThanOrEqual(0);
                expect(g).toBeLessThanOrEqual(255);
                expect(b).toBeGreaterThanOrEqual(0);
                expect(b).toBeLessThanOrEqual(255);
            });
        });
    });

    describe('generateColor', () => {
        it('should return a valid RGB color string', () => {
            const result = generateColor({
                seed: 'test-seed',
                theme: 'light',
            });

            expect(result.rgbString).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
        });

        it('should return consistent colors for same seed', () => {
            const color1 = generateColor({
                seed: 'consistent-seed',
                theme: 'light',
            });

            const color2 = generateColor({
                seed: 'consistent-seed',
                theme: 'light',
            });

            expect(color1.rgbString).toBe(color2.rgbString);
        });

        it('should return different colors for different seeds', () => {
            const color1 = generateColor({
                seed: 'seed-1',
                theme: 'light',
            });

            const color2 = generateColor({
                seed: 'seed-2',
                theme: 'light',
            });

            expect(color1.rgbString).not.toBe(color2.rgbString);
        });

        it('should return different colors for different themes', () => {
            const lightTheme = generateColor({
                seed: 'same-seed',
                theme: 'light',
            });

            const darkTheme = generateColor({
                seed: 'same-seed',
                theme: 'dark',
            });

            expect(lightTheme.rgbString).not.toBe(darkTheme.rgbString);
        });

        it('should produce valid RGB values even with extreme inputs', () => {
            const extremeSeeds = [
                '',
                'a',
                'very-long-seed-string-with-many-characters-to-test-edge-cases',
                '12345',
                'special-chars-!@#$%^&*()',
                'unicode-тест-🎨',
            ];

            extremeSeeds.forEach((seed) => {
                const result = generateColor({
                    seed,
                    theme: 'dark',
                });

                const color = result.rgbString;
                expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);

                // Extract RGB values and verify they're in valid range
                const matches = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
                expect(matches).not.toBeNull();

                if (matches) {
                    const [, r, g, b] = matches;
                    expect(parseInt(r, 10)).toBeGreaterThanOrEqual(0);
                    expect(parseInt(r, 10)).toBeLessThanOrEqual(255);
                    expect(parseInt(g, 10)).toBeGreaterThanOrEqual(0);
                    expect(parseInt(g, 10)).toBeLessThanOrEqual(255);
                    expect(parseInt(b, 10)).toBeGreaterThanOrEqual(0);
                    expect(parseInt(b, 10)).toBeLessThanOrEqual(255);
                }
            });
        });

        it('should not have correlation between saturation and lightness', () => {
            // Generate many colors and check that we get diverse combinations
            const colors = new Map<string, {count: number; rgb: string}>();
            const samples = 1000;

            // Generate colors with same theme to isolate the test
            for (let i = 0; i < samples; i++) {
                const result = generateColor({
                    seed: `test-seed-${i}-${Math.random()}`,
                    theme: 'dark',
                });

                const color = result.rgbString;

                // Simple hash of the color to track unique values
                const existing = colors.get(color);
                if (existing) {
                    existing.count++;
                } else {
                    colors.set(color, {count: 1, rgb: color});
                }
            }

            // With the fix, we should get many more unique colors
            // For dark: saturation [12, 17] (6 values), lightness [75, 80] (6 values)
            // Maximum possible unique combinations: 6 * 6 = 36
            // But due to OKLCH->RGB conversion, we might get fewer unique RGB values

            const uniqueColors = colors.size;

            // We should get significantly more than 6 unique colors (the old correlated version)
            expect(uniqueColors).toBeGreaterThan(20);
        });
    });

    describe('generateColor (details)', () => {
        it('should return detailed color information', () => {
            const details = generateColor({
                seed: 'test-seed',
                theme: 'light',
            });

            expect(details).toMatchObject({
                hash: expect.any(Number),
                oklch: {
                    l: expect.any(Number),
                    c: expect.any(Number),
                    h: expect.any(Number),
                },
                rgb: {
                    r: expect.any(Number),
                    g: expect.any(Number),
                    b: expect.any(Number),
                },
                rgbString: expect.stringMatching(/^rgb\(\d+, \d+, \d+\)$/),
                textColor: expect.any(String),
            });

            // Verify RGB string matches RGB values
            expect(details.rgbString).toBe(
                `rgb(${details.rgb.r}, ${details.rgb.g}, ${details.rgb.b})`,
            );
        });

        it('should return consistent details for same seed', () => {
            const details1 = generateColor({
                seed: 'consistent-seed',
                theme: 'dark',
            });

            const details2 = generateColor({
                seed: 'consistent-seed',
                theme: 'dark',
            });

            expect(details1).toEqual(details2);
        });

        it('should have rgbString matching RGB values', () => {
            const seed = 'test-seed';
            const theme = 'light';

            const details = generateColor({seed, theme});

            expect(details.rgbString).toBe(
                `rgb(${details.rgb.r}, ${details.rgb.g}, ${details.rgb.b})`,
            );
        });
    });
});
