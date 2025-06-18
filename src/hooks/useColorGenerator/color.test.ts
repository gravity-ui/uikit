import {getPersistentColor, getTextColor, linearToSrgb, oklchToRgb} from '../color';

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

    describe('getTextColor', () => {
        it('should return inverted color for heavy intensity', () => {
            const color = getTextColor('heavy');
            expect(color).toBe('var(--g-color-text-inverted-primary)');
        });

        it('should return primary color for light intensity', () => {
            const color = getTextColor('light');
            expect(color).toBe('var(--g-color-text-primary)');
        });

        it('should return primary color for medium intensity', () => {
            const color = getTextColor('medium');
            expect(color).toBe('var(--g-color-text-primary)');
        });

        it('should return primary color by default', () => {
            const color = getTextColor();
            expect(color).toBe('var(--g-color-text-primary)');
        });
    });

    describe('getPersistentColor', () => {
        it('should return a valid RGB color string', () => {
            const color = getPersistentColor({
                seed: 'test-seed',
                intensity: 'light',
                theme: 'light',
            });

            expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
        });

        it('should return consistent colors for same seed', () => {
            const color1 = getPersistentColor({
                seed: 'consistent-seed',
                intensity: 'medium',
                theme: 'light',
            });

            const color2 = getPersistentColor({
                seed: 'consistent-seed',
                intensity: 'medium',
                theme: 'light',
            });

            expect(color1).toBe(color2);
        });

        it('should return different colors for different seeds', () => {
            const color1 = getPersistentColor({
                seed: 'seed-1',
                intensity: 'light',
                theme: 'light',
            });

            const color2 = getPersistentColor({
                seed: 'seed-2',
                intensity: 'light',
                theme: 'light',
            });

            expect(color1).not.toBe(color2);
        });

        it('should return different colors for different intensities', () => {
            const lightColor = getPersistentColor({
                seed: 'same-seed',
                intensity: 'light',
                theme: 'light',
            });

            const heavyColor = getPersistentColor({
                seed: 'same-seed',
                intensity: 'heavy',
                theme: 'light',
            });

            expect(lightColor).not.toBe(heavyColor);
        });

        it('should return different colors for different themes', () => {
            const lightTheme = getPersistentColor({
                seed: 'same-seed',
                intensity: 'light',
                theme: 'light',
            });

            const darkTheme = getPersistentColor({
                seed: 'same-seed',
                intensity: 'light',
                theme: 'dark',
            });

            expect(lightTheme).not.toBe(darkTheme);
        });

        it('should handle default intensity', () => {
            const color = getPersistentColor({
                seed: 'test-seed',
                theme: 'light',
            });

            expect(color).toMatch(/^rgb\(\d+, \d+, \d+\)$/);
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
                const color = getPersistentColor({
                    seed,
                    intensity: 'heavy',
                    theme: 'dark',
                });

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

            // Generate colors with same intensity and theme to isolate the test
            for (let i = 0; i < samples; i++) {
                const color = getPersistentColor({
                    seed: `test-seed-${i}-${Math.random()}`,
                    intensity: 'medium',
                    theme: 'dark',
                });

                // Simple hash of the color to track unique values
                if (colors.has(color)) {
                    colors.get(color)!.count++;
                } else {
                    colors.set(color, {count: 1, rgb: color});
                }
            }

            // With the fix, we should get many more unique colors
            // For dark-medium: saturation [12, 17] (6 values), lightness [50, 55] (6 values)
            // Maximum possible unique combinations: 6 * 6 = 36
            // But due to OKLCH->RGB conversion, we might get fewer unique RGB values

            const uniqueColors = colors.size;

            // We should get significantly more than 6 unique colors (the old correlated version)
            expect(uniqueColors).toBeGreaterThan(20);
        });
    });
});
