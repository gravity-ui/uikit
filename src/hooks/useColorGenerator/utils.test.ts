import {getHue} from './utils';

describe('getHue', () => {
    test('returns values within the range [0, 360)', () => {
        const MIN_HASH = -Math.pow(2, 31);
        const MAX_HASH = Math.pow(2, 31);

        for (let i = 0; i < 1000; i++) {
            const hash = Math.random() * (MAX_HASH - MIN_HASH) + MIN_HASH;
            const hue = getHue(hash);

            expect(hue).toBeGreaterThanOrEqual(0);
            expect(hue).toBeLessThan(360);
        }

        const maxHue = getHue(MAX_HASH);
        const minHue = getHue(MIN_HASH);

        expect(maxHue).toBeGreaterThanOrEqual(0);
        expect(maxHue).toBeLessThan(360);
        expect(minHue).toBeGreaterThanOrEqual(0);
        expect(minHue).toBeLessThan(360);
    });
});
