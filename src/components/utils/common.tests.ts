import {randomIndex, randomString} from './common';

describe('randomIndex', () => {
    test('returns numbers within the range [0, max)', () => {
        const MAX_VALUE = 500;

        for (let i = 0; i <= 1000; i++) {
            const token = randomString(16);
            const index = randomIndex(token, MAX_VALUE);

            expect(index).toBeGreaterThanOrEqual(0);
            expect(index).toBeLessThan(MAX_VALUE);
        }

        const zeroIndex = randomIndex('test', 0);
        expect(zeroIndex).toBe(0);

        const oneIndex = randomIndex('test', 1);
        expect(oneIndex).toBe(0);
    });
});
