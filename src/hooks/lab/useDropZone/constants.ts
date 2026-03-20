export const DROP_ZONE_BASE_ATTRIBUTES = {
    'aria-dropeffect': 'copy' as DataTransfer['dropEffect'],
    tabIndex: 0,
    role: 'button',
};

export const FILE_REJECTION_REASONS = {
    INVALID_TYPE: 'invalid-type',
    TOO_MANY_FILES: 'too-many-files',
} as const;
