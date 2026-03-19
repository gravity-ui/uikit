import {FILE_REJECTION_REASONS} from '../constants';
import {getSeparatedItems, normalizeMaxFilesCount} from '../utils';

function createMockDataTransfer(itemTypes: string[]): DataTransfer {
    const items = itemTypes.map((type) => ({type, kind: 'file'}));
    return {items} as unknown as DataTransfer;
}

describe('normalizeMaxFilesCount', () => {
    test('undefined → Infinity', () => {
        expect(normalizeMaxFilesCount(undefined)).toBe(Infinity);
    });

    test('0 → Infinity', () => {
        expect(normalizeMaxFilesCount(0)).toBe(Infinity);
    });

    test('negative → Infinity', () => {
        expect(normalizeMaxFilesCount(-5)).toBe(Infinity);
    });

    test('positive number returns as-is', () => {
        expect(normalizeMaxFilesCount(3)).toBe(3);
    });

    test('1 returns 1', () => {
        expect(normalizeMaxFilesCount(1)).toBe(1);
    });
});

describe('getSeparatedItems', () => {
    test('all items pass validation → all in accepted', () => {
        const dt = createMockDataTransfer(['image/png', 'image/jpeg']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            maxFilesCount: Infinity,
        });
        expect(accepted).toHaveLength(2);
        expect(rejected).toHaveLength(0);
    });

    test('invalid MIME type → rejected with invalid-type', () => {
        const dt = createMockDataTransfer(['application/pdf']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            maxFilesCount: Infinity,
        });
        expect(accepted).toHaveLength(0);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });

    test('exceeding maxFilesCount → rejected with too-many-files', () => {
        const dt = createMockDataTransfer(['image/png', 'image/png', 'image/png']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            maxFilesCount: 2,
        });
        expect(accepted).toHaveLength(2);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.TOO_MANY_FILES]);
    });

    test('item can get both reasons at once', () => {
        const dt = createMockDataTransfer(['image/png', 'application/pdf']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            maxFilesCount: 1,
        });
        expect(accepted).toHaveLength(1);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual(
            expect.arrayContaining([
                FILE_REJECTION_REASONS.INVALID_TYPE,
                FILE_REJECTION_REASONS.TOO_MANY_FILES,
            ]),
        );
    });

    test('empty items list → empty arrays', () => {
        const dt = createMockDataTransfer([]);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            maxFilesCount: Infinity,
        });
        expect(accepted).toHaveLength(0);
        expect(rejected).toHaveLength(0);
    });

    test('exact MIME match without wildcard', () => {
        const dt = createMockDataTransfer(['image/png', 'image/jpeg']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/png'],
            maxFilesCount: Infinity,
        });
        expect(accepted).toHaveLength(1);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });

    test('wildcard image/* matches any image subtype', () => {
        const dt = createMockDataTransfer(['image/png', 'image/svg+xml', 'image/webp']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            maxFilesCount: Infinity,
        });
        expect(accepted).toHaveLength(3);
        expect(rejected).toHaveLength(0);
    });

    test('multiple accept patterns', () => {
        const dt = createMockDataTransfer(['image/png', 'application/pdf', 'text/plain']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*', 'application/pdf'],
            maxFilesCount: Infinity,
        });
        expect(accepted).toHaveLength(2);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].item).toBe(dt.items[2]);
    });

    test('invalid MIME format (no slash) → rejected', () => {
        const dt = createMockDataTransfer(['invalidmime']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            maxFilesCount: Infinity,
        });
        expect(accepted).toHaveLength(0);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });
});
