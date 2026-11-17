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

export type DropZoneFileRejection = Pick<FileRejection, 'reasons'> & {
    file: File;
};

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
}

function isExtensionToken(token: string): boolean {
    return token.startsWith('.');
}

function candidateMatchesToken(candidate: FileCandidate, token: string): boolean {
    if (isExtensionToken(token)) {
        if (candidate.name === undefined) {
            // The name is unknown until the drop, so a dragged file may still match the extension.
            return true;
        }

        return candidate.name.toLowerCase().endsWith(token);
    }

    return typeMatchesPattern(candidate.type.toLowerCase(), token);
}

export function isFileCandidateAccepted(
    candidate: FileCandidate,
    accept: FileDropZoneAccept,
): boolean {
    const tokens = (accept ?? []).map((token) => token.trim().toLowerCase()).filter(Boolean);

    // Like the HTML `accept` attribute, a list without valid tokens means no restriction.
    if (!tokens.length) {
        return true;
    }

    return tokens.some((token) => candidateMatchesToken(candidate, token));
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

function hasFileItems(dataTransfer: DataTransfer): boolean {
    return Array.from(dataTransfer.items ?? []).some((item) => item.kind === 'file');
}

/**
 * Whether the drag carries files. Safari exposes no file items until the drop (WebKit bug 223517),
 * but lists `'Files'` in `types`.
 */
export function hasDraggedFiles(dataTransfer: DataTransfer): boolean {
    return hasFileItems(dataTransfer) || Array.from(dataTransfer.types ?? []).includes('Files');
}

/**
 * Whether the dragged files can be validated before the drop: Safari exposes them only on drop.
 */
export function canValidateDraggedFiles(dataTransfer: DataTransfer): boolean {
    return hasFileItems(dataTransfer);
}

export function getSeparatedItems(
    dataTransfer: DataTransfer,
    options: ValidateOptions,
): {accepted: DataTransferItem[]; rejected: FileRejection[]} {
    // Only `kind: 'file'` items can become files on drop: dragged text or links (`kind: 'string'`)
    // yield `null` from `getAsFile()`, so they must not make the drag look valid.
    const fileItems = Array.from(dataTransfer.items).filter((item) => item.kind === 'file');

    return separateByValidation(fileItems, (item) => ({type: item.type}), options);
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
