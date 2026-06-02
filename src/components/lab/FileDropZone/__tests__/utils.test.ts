import {FILE_REJECTION_REASONS, getSeparatedItems} from '../utils';

function createMockDataTransfer(itemTypes: string[]): DataTransfer {
    const items = itemTypes.map((type) => ({type, kind: 'file'}));
    return {items} as unknown as DataTransfer;
}

describe('getSeparatedItems', () => {
    test('all items pass validation -> all in accepted', () => {
        const dt = createMockDataTransfer(['image/png', 'image/jpeg']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            multiple: true,
        });
        expect(accepted).toHaveLength(2);
        expect(rejected).toHaveLength(0);
    });

    test('invalid MIME type -> rejected with invalid-type', () => {
        const dt = createMockDataTransfer(['application/pdf']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            multiple: true,
        });
        expect(accepted).toHaveLength(0);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });

    test('single-file mode rejects valid items after first accepted item', () => {
        const dt = createMockDataTransfer(['image/png', 'image/jpeg']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
        });
        expect(accepted).toHaveLength(1);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.TOO_MANY_FILES]);
    });

    test('item can get invalid-type and too-many-files reasons at once', () => {
        const dt = createMockDataTransfer(['image/png', 'application/pdf']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
        });
        expect(accepted).toHaveLength(1);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([
            FILE_REJECTION_REASONS.INVALID_TYPE,
            FILE_REJECTION_REASONS.TOO_MANY_FILES,
        ]);
    });

    test('empty items list -> empty arrays', () => {
        const dt = createMockDataTransfer([]);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
        });
        expect(accepted).toHaveLength(0);
        expect(rejected).toHaveLength(0);
    });

    test('exact MIME match without wildcard', () => {
        const dt = createMockDataTransfer(['image/png', 'image/jpeg']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/png'],
            multiple: true,
        });
        expect(accepted).toHaveLength(1);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });

    test('wildcard image/* matches any image subtype', () => {
        const dt = createMockDataTransfer(['image/png', 'image/svg+xml', 'image/webp']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            multiple: true,
        });
        expect(accepted).toHaveLength(3);
        expect(rejected).toHaveLength(0);
    });

    test('multiple accept patterns', () => {
        const dt = createMockDataTransfer(['image/png', 'application/pdf', 'text/plain']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*', 'application/pdf'],
            multiple: true,
        });
        expect(accepted).toHaveLength(2);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].item).toBe(dt.items[2]);
    });

    test('invalid MIME format without slash -> rejected', () => {
        const dt = createMockDataTransfer(['invalidmime']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            multiple: true,
        });
        expect(accepted).toHaveLength(0);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });
});
