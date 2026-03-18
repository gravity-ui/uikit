import type {DROP_ZONE_BASE_ATTRIBUTES, FILE_REJECTION_REASONS} from './constants';

export type UseDropZoneAccept = string[];

interface UseDropZoneBaseParams {
    accept: UseDropZoneAccept;
    maxFilesCount?: number;
    disabled?: boolean;
    multiple?: boolean;
    onDropRejected?: (items: FileRejection[]) => void;
}

type UseDropZoneWithOnDrop = UseDropZoneBaseParams & {
    onDrop: (acceptedFiles: DataTransferItem[], fileRejections: FileRejection[]) => void;
    onDropAccepted?: (items: DataTransferItem[]) => void;
};

type UseDropZoneWithOnDropAccepted = UseDropZoneBaseParams & {
    onDrop?: (acceptedFiles: DataTransferItem[], fileRejections: FileRejection[]) => void;
    onDropAccepted: (items: DataTransferItem[]) => void;
};

export type UseDropZoneCommonParams = UseDropZoneWithOnDrop | UseDropZoneWithOnDropAccepted;

export type UseDropZoneParamsWithRef = UseDropZoneCommonParams & {
    ref: React.RefObject<HTMLElement>;
};

export type UseDropZoneParamsWithoutRef = UseDropZoneCommonParams & {
    ref?: undefined;
};

export type UseDropZoneParams = UseDropZoneParamsWithRef | UseDropZoneParamsWithoutRef;

export interface UseDropZoneDroppableProps extends Required<typeof DROP_ZONE_BASE_ATTRIBUTES> {
    onDragEnter: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
}

export interface UseDropZoneStateWithRef {
    isDraggingOver: boolean;
    isInvalidDrag: boolean;
}

export interface UseDropZoneStateWithoutRef {
    isDraggingOver: boolean;
    isInvalidDrag: boolean;
    getDroppableProps: () => UseDropZoneDroppableProps;
}

export type FileRejectionReason =
    (typeof FILE_REJECTION_REASONS)[keyof typeof FILE_REJECTION_REASONS];

export type UseDropZoneState = UseDropZoneStateWithRef | UseDropZoneStateWithoutRef;

export interface FileRejection {
    item: DataTransferItem;
    reasons: FileRejectionReason[];
}

export interface ValidateOptions {
    accept: UseDropZoneAccept;
    maxFilesCount: number;
}
