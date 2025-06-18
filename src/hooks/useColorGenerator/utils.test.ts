/* eslint-disable no-bitwise */
import {extractHashPart, getHash, getHue, normalizeHash} from './utils';

// Deterministic set of hash values for testing
const createTestHashSet = (size: number): number[] => {
    const hashes: number[] = [];
    const minHash = -2147483648; // -2^31
    const maxHash = 2147483647; // 2^31 - 1
    const range = maxHash - minHash;

    // Create uniformly distributed values across the entire range
    for (let i = 0; i < size; i++) {
        const position = i / (size - 1);
        const hash = Math.floor(minHash + position * range);
        hashes.push(hash);
    }

    // Add special boundary cases
    if (size > 10) {
        hashes[0] = minHash;
        hashes[1] = maxHash;
        hashes[2] = 0;
        hashes[3] = 1;
        hashes[4] = -1;
        hashes[5] = 1000000;
        hashes[6] = -1000000;
        hashes[7] = 2147483646;
        hashes[8] = -2147483647;
        hashes[9] = 42;
    }

    return hashes;
};

// Deterministic set of string seeds for testing hash function
const createTestStringSet = (size: number): string[] => {
    const strings: string[] = [];

    for (let i = 0; i < size; i++) {
        const patterns = [
            `test-${i}`,
            `user-${i.toString(16)}`,
            `item_${i}_suffix`,
            `${i.toString().padStart(6, '0')}`,
            `prefix${String.fromCharCode(65 + (i % 26))}${i}`,
            `${i}.${i * 2}.${i * 3}`,
            `hash${i}test${i * 7}`,
            JSON.stringify({id: i, type: 'test'}),
        ];

        const pattern = patterns[i % patterns.length];
        strings.push(pattern);
    }

    // Add special edge cases
    if (size > 20) {
        strings[0] = '';
        strings[1] = ' ';
        strings[2] = 'a';
        strings[3] = 'test';
        strings[4] = 'A'.repeat(100);
        strings[5] = '1234567890';
        strings[6] = 'abcdefghijklmnopqrstuvwxyz';
        strings[7] = '!@#$%^&*()';
        strings[8] = 'тест';
        strings[9] = '测试';
        strings[10] = '🔥💯✨';
        strings[11] = '\n\t\r';
        strings[12] = '0'.repeat(50);
        strings[13] = Math.random().toString(36);
        strings[14] = new Date().toISOString();
        strings[15] =
            'VeryLongStringThatContainsLotsOfCharactersAndShouldTestTheHashFunctionProperly';
        strings[16] = 'user123';
        strings[17] = 'component-name-with-dashes';
        strings[18] = 'UPPERCASE_CONSTANT';
        strings[19] = 'mixedCaseVariable';
    }

    return strings;
};

describe('useColorGenerator utils', () => {
    describe('normalizeHash', () => {
        it('should return values within specified range', () => {
            const hash = 123456789;
            const min = 10;
            const max = 20;

            const result = normalizeHash(hash, min, max);

            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        });

        it('should handle single value range', () => {
            const result = normalizeHash(12345, 5, 5);
            expect(result).toBe(5);
        });

        it('should distribute values across the range', () => {
            const min = 0;
            const max = 9;
            const counts = new Array(10).fill(0);

            // Генерируем много значений
            for (let i = 0; i < 1000; i++) {
                const result = normalizeHash(i, min, max);
                counts[result]++;
            }

            // Проверяем, что все значения были сгенерированы
            counts.forEach((count) => {
                expect(count).toBeGreaterThan(0);
            });
        });
    });

    describe('extractHashPart', () => {
        it('should return different values for different offsets', () => {
            const hash = getHash('test-seed');

            const part0 = extractHashPart(hash, 0);
            const part1 = extractHashPart(hash, 1);
            const part2 = extractHashPart(hash, 2);

            // Части должны быть разными
            expect(part0).not.toBe(part1);
            expect(part1).not.toBe(part2);
            expect(part0).not.toBe(part2);
        });

        it('should return consistent values for the same input', () => {
            const hash = 123456789;

            const part1 = extractHashPart(hash, 0);
            const part2 = extractHashPart(hash, 0);

            expect(part1).toBe(part2);
        });

        it('should eliminate correlation between parameters', () => {
            // Тестируем что использование extractHashPart устраняет корреляцию
            const samples = 1000;
            const data: Array<{sat: number; light: number}> = [];

            // Диапазоны одинакового размера (где была проблема)
            const satRange = [10, 15]; // размер 6
            const lightRange = [50, 55]; // размер 6

            for (let i = 0; i < samples; i++) {
                const seed = `test-${i}-${Math.random()}`;
                const hash = getHash(seed);

                // Используем разные части хэша
                const satHash = extractHashPart(hash, 0);
                const lightHash = extractHashPart(hash, 1);

                const sat = normalizeHash(satHash, satRange[0], satRange[1]);
                const light = normalizeHash(lightHash, lightRange[0], lightRange[1]);

                data.push({sat, light});
            }

            // Подсчитываем уникальные комбинации
            const uniqueCombinations = new Set(data.map(({sat, light}) => `${sat}-${light}`)).size;

            // Должны получить все возможные комбинации (или близко к этому)
            const maxPossible = 6 * 6;
            expect(uniqueCombinations).toBeGreaterThan(maxPossible * 0.8); // Минимум 80% комбинаций
        });

        it('should handle edge cases', () => {
            expect(() => extractHashPart(0, 0)).not.toThrow();
            expect(() => extractHashPart(-1, 0)).not.toThrow();
            expect(() => extractHashPart(2147483647, 2)).not.toThrow();

            // Результаты должны быть числами
            expect(typeof extractHashPart(0, 0)).toBe('number');
            expect(extractHashPart(0, 0)).toBeGreaterThanOrEqual(0);
        });
    });

    describe('getHue', () => {
        const BASIC_TEST_HASHES = createTestHashSet(1000);
        const DISTRIBUTION_TEST_HASHES = createTestHashSet(50000);

        test('returns values within the range [0, 360)', () => {
            const hueArray = BASIC_TEST_HASHES.map((hash) => getHue(hash));

            const maxHueValue = Math.max(...hueArray);
            const minHueValue = Math.min(...hueArray);

            expect(maxHueValue).toBeLessThan(360);
            expect(minHueValue).toBeGreaterThanOrEqual(0);
        });

        describe('provides good uniform distribution', () => {
            const BINS = 36;
            const BIN_SIZE = 360 / BINS;
            const EXPECTED_PER_BIN = DISTRIBUTION_TEST_HASHES.length / BINS;
            const MAX_ALLOWED_DEVIATION = 0.05; // 5% maximum deviation - realistic for uniform function
            const MAX_CHI_SQUARE = 0.1; // Very low value for practically perfect distribution
            const MAX_RATIO = 1.05; // Maximum ratio of max/min for uniformity

            const bins = new Array(BINS).fill(0);

            DISTRIBUTION_TEST_HASHES.forEach((hash) => {
                const hue = getHue(hash);
                const binIndex = Math.floor(hue / BIN_SIZE);
                bins[binIndex]++;
            });

            test(`has max deviation ${MAX_ALLOWED_DEVIATION}`, () => {
                const deviationArray = bins.map(
                    (bin) => Math.abs(bin - EXPECTED_PER_BIN) / EXPECTED_PER_BIN,
                );
                const maxDeviation = Math.max(...deviationArray);

                expect(maxDeviation).toBeLessThan(MAX_ALLOWED_DEVIATION);
            });

            test(`has max chi-square less than ${MAX_CHI_SQUARE}`, () => {
                const chiSquare = bins.reduce((sum, count) => {
                    const diff = count - EXPECTED_PER_BIN;
                    return sum + (diff * diff) / EXPECTED_PER_BIN;
                }, 0);
                expect(chiSquare).toBeLessThan(MAX_CHI_SQUARE);
            });

            test(`has max ratio less than ${MAX_RATIO}`, () => {
                const minCount = Math.min(...bins);
                const maxCount = Math.max(...bins);
                const ratio = maxCount / minCount;
                expect(ratio).toBeLessThan(MAX_RATIO);
            });
        });
    });

    describe('getHash', () => {
        const BASIC_TEST_STRINGS = createTestStringSet(1000);
        const DISTRIBUTION_TEST_STRINGS = createTestStringSet(5000);
        const DISTRIBUTION_TEST_HASHES = DISTRIBUTION_TEST_STRINGS.map((seed) => getHash(seed));

        const MAX_COLLISION_RATE = 0.1;

        test('returns consistent hash values for same input', () => {
            BASIC_TEST_STRINGS.forEach((seed) => {
                const hash1 = getHash(seed);
                const hash2 = getHash(seed);
                const hash3 = getHash(seed);

                expect(hash1).toBe(hash2);
                expect(hash2).toBe(hash3);
            });
        });

        test('returns valid 32-bit signed integer values', () => {
            const hashArray = BASIC_TEST_STRINGS.map((seed) => getHash(seed));

            hashArray.forEach((hash) => {
                expect(hash).toBeGreaterThanOrEqual(-2147483648); // -2^31
                expect(hash).toBeLessThanOrEqual(2147483647); // 2^31 - 1
                expect(Number.isInteger(hash)).toBe(true);
            });
        });

        test('produces different hashes for different inputs', () => {
            const hashes = new Set<number>();
            let collisions = 0;

            DISTRIBUTION_TEST_STRINGS.forEach((seed) => {
                const hash = getHash(seed);
                if (hashes.has(hash)) {
                    collisions++;
                }
                hashes.add(hash);
            });

            const collisionRate = collisions / DISTRIBUTION_TEST_STRINGS.length;
            expect(collisionRate).toBeLessThan(MAX_COLLISION_RATE);
            expect(hashes.size).toBeGreaterThan(DISTRIBUTION_TEST_STRINGS.length * 0.9);
        });

        it('should distinguish between strings with and without null bytes', () => {
            const hash1 = getHash('abc');
            const hash2 = getHash('abc\0');
            expect(hash1).not.toBe(hash2);
        });

        it('should provide good distribution for sequential inputs', () => {
            const hashes = new Set();
            for (let i = 0; i < 100; i++) {
                hashes.add(getHash(i.toString()));
            }
            // All hashes should be unique for sequential numbers
            expect(hashes.size).toBe(100);
        });

        it('should have good avalanche effect', () => {
            const base = 'test';
            const baseHash = getHash(base);

            // Change one character
            const modified = 'test'.replace('e', 'f');
            const modifiedHash = getHash(modified);

            // Count bit differences
            let xor = baseHash ^ modifiedHash;
            let bitDifferences = 0;
            while (xor) {
                bitDifferences += xor & 1;
                xor >>>= 1;
            }

            // Should have significant bit differences (at least 10 bits)
            expect(bitDifferences).toBeGreaterThanOrEqual(10);
        });

        describe('basic distribution properties', () => {
            test('hash values span a wide range', () => {
                const minHash = Math.min(...DISTRIBUTION_TEST_HASHES);
                const maxHash = Math.max(...DISTRIBUTION_TEST_HASHES);
                const range = maxHash - minHash;

                // Hash values should span a significant portion of the 32-bit space
                expect(range).toBeGreaterThan(1000000); // At least 1 million range
            });
        });

        describe('avalanche effect - small input changes cause large hash changes', () => {
            test('single character change produces different hash', () => {
                const baseStrings = [
                    'test',
                    'user123',
                    'component-name',
                    'longStringWithManyCharacters',
                ];

                baseStrings.forEach((base) => {
                    const baseHash = getHash(base);

                    for (let i = 0; i < Math.min(base.length, 5); i++) {
                        const modified = base.substring(0, i) + 'X' + base.substring(i + 1);
                        const modifiedHash = getHash(modified);

                        // Hashes should be significantly different
                        expect(modifiedHash).not.toBe(baseHash);

                        // XOR to see how many bits changed
                        const diff = Math.abs(baseHash - modifiedHash);
                        expect(diff).toBeGreaterThan(1000);
                    }
                });
            });

            test('adding single character produces different hash', () => {
                const baseStrings = ['test', 'user', 'comp'];

                baseStrings.forEach((base) => {
                    const baseHash = getHash(base);
                    const extendedHash = getHash(base + 'X');

                    expect(extendedHash).not.toBe(baseHash);
                    const diff = Math.abs(baseHash - extendedHash);
                    expect(diff).toBeGreaterThan(1000);
                });
            });

            test('string length changes affect hash significantly', () => {
                const base = 'test';
                const variations = [base, base + 'a', base + 'ab', base + 'abc', base + 'abcd'];

                const hashes = variations.map((str) => getHash(str));

                // All should be different
                const uniqueHashes = new Set(hashes);
                expect(uniqueHashes.size).toBe(variations.length);

                for (let i = 1; i < hashes.length; i++) {
                    const diff = Math.abs(hashes[i] - hashes[i - 1]);
                    expect(diff).toBeGreaterThan(1000);
                }
            });
        });

        describe('edge cases', () => {
            test('handles empty string', () => {
                const hash = getHash('');
                expect(Number.isInteger(hash)).toBe(true);
                expect(hash).not.toBe(0);
            });

            test('handles very long strings', () => {
                const longString = 'a'.repeat(10000);
                const hash = getHash(longString);
                expect(Number.isInteger(hash)).toBe(true);

                const shortHash = getHash('a'.repeat(100));
                expect(hash).not.toBe(shortHash);
            });

            test('handles unicode characters', () => {
                const unicodeStrings = ['测试', '🔥', 'тест', '🌟⭐'];

                unicodeStrings.forEach((str) => {
                    const hash = getHash(str);
                    expect(Number.isInteger(hash)).toBe(true);

                    const asciiEquivalent = 'a'.repeat(str.length);
                    const asciiHash = getHash(asciiEquivalent);
                    expect(hash).not.toBe(asciiHash);
                });
            });
        });
    });
});
