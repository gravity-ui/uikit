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

describe('randomString', () => {
    const MASK = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    test('generates string of correct length', () => {
        expect(randomString(0)).toHaveLength(0);
        expect(randomString(1)).toHaveLength(1);
        expect(randomString(10)).toHaveLength(10);
        expect(randomString(50)).toHaveLength(50);
    });

    test('generates different strings on multiple calls', () => {
        const strings = new Set();
        const iterations = 100;

        for (let i = 0; i < iterations; i++) {
            strings.add(randomString(10));
        }

        // Should generate mostly unique strings (allowing for rare collisions)
        expect(strings.size).toBeGreaterThan(iterations * 0.9);
    });

    test('only uses characters from the mask', () => {
        const testString = randomString(1000);

        for (const char of testString) {
            expect(MASK).toContain(char);
        }
    });

    test('has reasonable character distribution', () => {
        const charCounts: Record<string, number> = {};
        const testLength = 10000;
        const testString = randomString(testLength);

        // Count character occurrences
        for (const char of testString) {
            charCounts[char] = (charCounts[char] || 0) + 1;
        }

        // Each character should appear at least once in a long string
        // and no character should be overly dominant
        const totalChars = Object.keys(charCounts).length;
        expect(totalChars).toBeGreaterThan(MASK.length * 0.8); // At least 80% of characters used

        // No single character should dominate (more than 5% of total)
        for (const count of Object.values(charCounts)) {
            expect(count).toBeLessThan(testLength * 0.05);
        }
    });

    test('handles edge cases', () => {
        expect(randomString(0)).toBe('');
        expect(randomString(-1)).toBe(''); // Should handle negative input gracefully
    });
});
