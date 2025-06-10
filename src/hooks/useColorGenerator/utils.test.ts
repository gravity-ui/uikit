import {getHue} from './utils';

// Deterministic set of hash values for testing
// Covers the entire int32 range with different patterns
const createTestHashSet = (size: number): number[] => {
    const hashes: number[] = [];
    const minHash = -2147483648; // -2^31
    const maxHash = 2147483647; // 2^31 - 1
    const range = maxHash - minHash;

    // Create uniformly distributed values across the entire range
    for (let i = 0; i < size; i++) {
        // Use linear distribution across the range
        const position = i / (size - 1); // from 0 to 1
        const hash = Math.floor(minHash + position * range);
        hashes.push(hash);
    }

    // Add special boundary cases
    if (size > 10) {
        hashes[0] = minHash; // Minimum value
        hashes[1] = maxHash; // Maximum value
        hashes[2] = 0; // Zero
        hashes[3] = 1; // Positive one
        hashes[4] = -1; // Negative one
        hashes[5] = 1000000; // Large positive
        hashes[6] = -1000000; // Large negative
        hashes[7] = 2147483646; // Almost maximum
        hashes[8] = -2147483647; // Almost minimum
        hashes[9] = 42; // Arbitrary value
    }

    return hashes;
};

// Create constant data sets of different sizes
const BASIC_TEST_HASHES = createTestHashSet(1000);
const DISTRIBUTION_TEST_HASHES = createTestHashSet(50000);

describe('getHue', () => {
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

        // Use deterministic data set
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
