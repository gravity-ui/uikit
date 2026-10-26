import {
    FILE_REJECTION_REASONS,
    getSeparatedFiles,
    getSeparatedItems,
    isFileCandidateAccepted,
} from '../utils';

function createFile(name: string, type: string): File {
    return new File(['x'], name, {type});
}

function createMockDataTransfer(itemTypes: string[]): DataTransfer {
    const items = itemTypes.map((type) => ({type, kind: 'file'}));
    return {items} as unknown as DataTransfer;
}

function createNonIterableMockDataTransfer(itemTypes: string[]): DataTransfer {
    const items = {length: itemTypes.length} as Record<number, {type: string; kind: string}> & {
        length: number;
    };

    itemTypes.forEach((type, index) => {
        items[index] = {type, kind: 'file'};
    });

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

    test('supports non-iterable DataTransferItemList', () => {
        const dt = createNonIterableMockDataTransfer(['image/png', 'application/pdf']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: ['image/*'],
            multiple: true,
        });

        expect(accepted).toHaveLength(1);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });

    test('empty accept list allows all item types', () => {
        const dt = createMockDataTransfer(['image/png', 'application/pdf', 'text/plain']);
        const {accepted, rejected} = getSeparatedItems(dt, {
            accept: [],
            multiple: true,
        });
        expect(accepted).toHaveLength(3);
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

describe('getSeparatedItems (dragenter, no file names)', () => {
    test('string item with extension accept -> rejected with invalid-type', () => {
        const dt = {items: [{type: 'text/plain', kind: 'string'}]} as unknown as DataTransfer;
        const {accepted, rejected} = getSeparatedItems(dt, {accept: ['.csv'], multiple: true});
        expect(accepted).toHaveLength(0);
        expect(rejected).toHaveLength(1);
        expect(rejected[0].reasons).toEqual([FILE_REJECTION_REASONS.INVALID_TYPE]);
    });

    test('file item without type with extension accept -> potentially valid', () => {
        const dt = createMockDataTransfer(['']);
        const {accepted, rejected} = getSeparatedItems(dt, {accept: ['.csv'], multiple: true});
        expect(accepted).toHaveLength(1);
        expect(rejected).toHaveLength(0);
    });
});

describe('isFileCandidateAccepted', () => {
    test('empty accept list accepts everything', () => {
        expect(isFileCandidateAccepted({type: '', name: 'any.bin'}, [])).toBe(true);
    });

    test.each([
        ['data.csv', true],
        ['DATA.CSV', true],
        ['data.csv.bak', false],
        ['csv', false],
    ])('extension .csv vs %s -> %s', (name, expected) => {
        expect(isFileCandidateAccepted({type: 'text/csv', name}, ['.csv'])).toBe(expected);
    });

    test('multi-dot extension', () => {
        expect(isFileCandidateAccepted({type: '', name: 'a.tar.gz'}, ['.tar.gz'])).toBe(true);
    });

    test('tokens are trimmed', () => {
        expect(isFileCandidateAccepted({type: '', name: 'notes.md'}, [' .md '])).toBe(true);
    });

    test('empty tokens are ignored', () => {
        expect(isFileCandidateAccepted({type: 'text/plain', name: 'a.txt'}, [''])).toBe(false);
        expect(isFileCandidateAccepted({type: 'text/plain', name: 'a.txt'}, ['  '])).toBe(false);
    });

    test('MIME matching is case-insensitive', () => {
        expect(isFileCandidateAccepted({type: 'Image/PNG', name: 'a.png'}, ['image/*'])).toBe(true);
        expect(isFileCandidateAccepted({type: 'image/png', name: 'a.png'}, ['IMAGE/PNG'])).toBe(
            true,
        );
    });

    test('unknown name and file kind is potentially valid for extension tokens', () => {
        expect(isFileCandidateAccepted({type: '', kind: 'file'}, ['.csv'])).toBe(true);
    });

    test('unknown name and string kind is not valid for extension tokens', () => {
        expect(isFileCandidateAccepted({type: 'text/plain', kind: 'string'}, ['.csv'])).toBe(false);
    });

    test('unknown name does not relax MIME tokens', () => {
        expect(isFileCandidateAccepted({type: 'application/pdf', kind: 'file'}, ['image/*'])).toBe(
            false,
        );
    });

    test('empty type never matches MIME tokens', () => {
        expect(isFileCandidateAccepted({type: '', name: 'photo.heic'}, ['image/*'])).toBe(false);
    });

    test('empty type matches extension tokens', () => {
        expect(isFileCandidateAccepted({type: '', name: 'notes.md'}, ['.md'])).toBe(true);
    });
});

describe('getSeparatedFiles', () => {
    test('mixed MIME and extension accept', () => {
        const png = createFile('a.png', 'image/png');
        const csv = createFile('b.csv', 'text/csv');
        const pdf = createFile('c.pdf', 'application/pdf');
        const {accepted, rejected} = getSeparatedFiles([png, csv, pdf], {
            accept: ['image/*', '.csv'],
            multiple: true,
        });
        expect(accepted).toEqual([png, csv]);
        expect(rejected).toEqual([{file: pdf, reasons: [FILE_REJECTION_REASONS.INVALID_TYPE]}]);
    });

    test('single-file mode rejects the second file with too-many-files', () => {
        const first = createFile('a.csv', 'text/csv');
        const second = createFile('b.csv', 'text/csv');
        const {accepted, rejected} = getSeparatedFiles([first, second], {accept: ['.csv']});
        expect(accepted).toEqual([first]);
        expect(rejected).toEqual([
            {file: second, reasons: [FILE_REJECTION_REASONS.TOO_MANY_FILES]},
        ]);
    });

    test('single-file mode: a rejected file does not consume the slot', () => {
        const pdf = createFile('a.pdf', 'application/pdf');
        const csv = createFile('b.csv', 'text/csv');
        const {accepted, rejected} = getSeparatedFiles([pdf, csv], {accept: ['.csv']});
        expect(accepted).toEqual([csv]);
        expect(rejected).toEqual([{file: pdf, reasons: [FILE_REJECTION_REASONS.INVALID_TYPE]}]);
    });

    test('empty list -> empty arrays', () => {
        expect(getSeparatedFiles([], {accept: ['.csv']})).toEqual({accepted: [], rejected: []});
    });
});
