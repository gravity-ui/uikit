import type {DropZoneFileRejection} from './types';

export const FILE_REJECTION_REASONS = {
    INVALID_TYPE: 'invalid-type',
    TOO_MANY_FILES: 'too-many-files',
} as const;

export type FileDropZoneAccept = string[];

export type FileRejectionReason =
    (typeof FILE_REJECTION_REASONS)[keyof typeof FILE_REJECTION_REASONS];

export interface FileRejection {
    item: DataTransferItem;
    reasons: FileRejectionReason[];
}

interface ValidateOptions {
    accept: FileDropZoneAccept;
    multiple?: boolean;
}

function typeMatchesPattern(actualMimeType: string, expectedMimeTypePattern: string): boolean {
    const actualMimeTypeParts = actualMimeType.split('/');

    if (actualMimeTypeParts.length !== 2) {
        return false;
    }

    const [actualType] = actualMimeTypeParts;
    const [expectedType, expectedSubtype] = expectedMimeTypePattern.split('/');

    if (expectedSubtype === '*') {
        return actualType === expectedType;
    }

    return actualMimeType === expectedMimeTypePattern;
}

export interface FileCandidate {
    type: string;
    /** `undefined` when the name is not available yet (e.g. on `dragenter`) */
    name?: string;
    /** `DataTransferItem.kind` when known (`'file'` | `'string'`); `undefined` for `File` objects */
    kind?: string;
}

function isExtensionToken(token: string): boolean {
    return token.startsWith('.');
}

function candidateMatchesToken(candidate: FileCandidate, token: string): boolean {
    if (isExtensionToken(token)) {
        if (candidate.name === undefined) {
            // The name is unknown until the drop: a dragged file may match the extension,
            // dragged text or links cannot.
            return candidate.kind !== 'string';
        }

        return candidate.name.toLowerCase().endsWith(token);
    }

    return typeMatchesPattern(candidate.type.toLowerCase(), token);
}

export function isFileCandidateAccepted(
    candidate: FileCandidate,
    accept: FileDropZoneAccept,
): boolean {
    if (!accept?.length) {
        return true;
    }

    return accept.some((rawToken) => {
        const token = rawToken.trim().toLowerCase();

        return token.length > 0 && candidateMatchesToken(candidate, token);
    });
}

interface SeparationResult<T> {
    accepted: T[];
    rejected: Array<{item: T; reasons: FileRejectionReason[]}>;
}

function separateByValidation<T>(
    items: T[],
    getCandidate: (item: T) => FileCandidate,
    {accept, multiple}: ValidateOptions,
): SeparationResult<T> {
    const accepted: T[] = [];
    const rejected: SeparationResult<T>['rejected'] = [];

    for (const item of items) {
        const reasons: FileRejectionReason[] = [];

        if (!isFileCandidateAccepted(getCandidate(item), accept)) {
            reasons.push(FILE_REJECTION_REASONS.INVALID_TYPE);
        }

        if (!multiple && accepted.length === 1) {
            reasons.push(FILE_REJECTION_REASONS.TOO_MANY_FILES);
        }

        if (reasons.length) {
            rejected.push({item, reasons});
        } else {
            accepted.push(item);
        }
    }

    return {accepted, rejected};
}

export function getSeparatedItems(
    dataTransfer: DataTransfer,
    options: ValidateOptions,
): {accepted: DataTransferItem[]; rejected: FileRejection[]} {
    return separateByValidation(
        Array.from(dataTransfer.items),
        (item) => ({type: item.type, kind: item.kind}),
        options,
    );
}

export function getSeparatedFiles(
    files: File[],
    options: ValidateOptions,
): {accepted: File[]; rejected: DropZoneFileRejection[]} {
    const {accepted, rejected} = separateByValidation(
        files,
        (file) => ({type: file.type, name: file.name}),
        options,
    );

    return {
        accepted,
        rejected: rejected.map(({item, reasons}) => ({file: item, reasons})),
    };
}
