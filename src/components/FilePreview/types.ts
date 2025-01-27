export const FILE_TYPES = [
    'default',
    'image',
    'video',
    'code',
    'archive',
    'music',
    'audio',
    'text',
    'pdf',
    'table',
] as const;

export type FileType = (typeof FILE_TYPES)[number];
