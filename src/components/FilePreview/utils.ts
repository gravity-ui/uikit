import type {FileType} from './types';
import {FILE_TYPES} from './types';

const isFilePreviewFileType = (str: string): str is FileType =>
    FILE_TYPES.includes(str.toLowerCase() as FileType);

export function getFileType(fileType: File['type']): FileType;
export function getFileType(file: File): FileType;

export function getFileType(arg: File | File['type']): FileType {
    const fileType: File['type'] = typeof arg === 'string' ? arg : arg.type;

    if (isFilePreviewFileType(fileType)) {
        return fileType;
    }

    const splittedFileType = fileType.split('/')[0];

    if (isFilePreviewFileType(splittedFileType)) {
        return splittedFileType;
    }

    return 'default';
}
