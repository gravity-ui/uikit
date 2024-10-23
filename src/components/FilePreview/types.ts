export const FILE_TYPES = [
    'default',
    'image',
    'video',
    'code',
    'archive',
    'music',
    'text',
    'pdf',
    'table',
] as const;

export type FileType = (typeof FILE_TYPES)[number];
