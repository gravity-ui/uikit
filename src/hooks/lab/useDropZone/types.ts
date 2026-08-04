import type {DROP_ZONE_BASE_ATTRIBUTES} from './constants';

export type UseDropZoneEventHandler = (event: DragEvent) => void;

interface UseDropZoneBaseParams {
    disabled?: boolean;
    onDragEnter?: UseDropZoneEventHandler;
    onDragOver?: UseDropZoneEventHandler;
    onDragLeave?: UseDropZoneEventHandler;
    onDrop?: UseDropZoneEventHandler;
}

export type UseDropZoneParamsWithRef = UseDropZoneBaseParams & {
    ref: React.RefObject<HTMLElement>;
};

export type UseDropZoneParamsWithoutRef = UseDropZoneBaseParams & {
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
}

export interface UseDropZoneStateWithoutRef {
    isDraggingOver: boolean;
    getDroppableProps: () => UseDropZoneDroppableProps;
}

export type UseDropZoneState = UseDropZoneStateWithRef | UseDropZoneStateWithoutRef;
