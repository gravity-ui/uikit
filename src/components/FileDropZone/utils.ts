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

function getItemInvalidType(
    item: DataTransferItem,
    {accept}: ValidateOptions,
): FileRejectionReason[] {
    const reasons: FileRejectionReason[] = [];
    if (accept?.length && !accept.some((pattern) => typeMatchesPattern(item.type, pattern))) {
        reasons.push(FILE_REJECTION_REASONS.INVALID_TYPE);
    }

    return reasons;
}

export function getSeparatedItems(dataTransfer: DataTransfer, options: ValidateOptions) {
    const items = Array.from(dataTransfer.items);
    const accepted: DataTransferItem[] = [];
    const rejected: FileRejection[] = [];

    for (const item of items) {
        const invalidType = getItemInvalidType(item, options);
        const tooManyFiles = !options.multiple && accepted.length === 1;
        if (invalidType.length || tooManyFiles) {
            const reasons: FileRejectionReason[] = [...invalidType];

            if (tooManyFiles) {
                reasons.push(FILE_REJECTION_REASONS.TOO_MANY_FILES);
            }

            rejected.push({
                item,
                reasons,
            });
        } else {
            accepted.push(item);
        }
    }

    return {accepted, rejected};
}
