import {FILE_REJECTION_REASONS} from './constants';
import type {FileRejection, FileRejectionReason, ValidateOptions} from './types';

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
    const items = dataTransfer.items;
    const accepted: DataTransferItem[] = [];
    const rejected: FileRejection[] = [];

    for (const item of items) {
        const invalidType = getItemInvalidType(item, options);
        const tooManyFiles = accepted.length === options.maxFilesCount;
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

export function normalizeMaxFilesCount(value?: number): number {
    return value && value > 0 ? value : Infinity;
}
