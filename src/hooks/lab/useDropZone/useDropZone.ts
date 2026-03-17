import * as React from 'react';

export type UseDropZoneAccept = string[];

interface UseDropZoneBaseParams {
    accept: UseDropZoneAccept;
    disabled?: boolean;
    onDrop: (items: DataTransferItemList) => void;
    onDropAccepted?: (items: DataTransferItem[]) => void;
    onDropRejected?: (items: DataTransferItem[]) => void;
}

export interface UseDropZoneParamsWithRef extends UseDropZoneBaseParams {
    ref: React.RefObject<HTMLElement>;
}

export interface UseDropZoneParamsWithoutRef extends UseDropZoneBaseParams {
    ref?: undefined;
}

export type UseDropZoneParams = UseDropZoneParamsWithRef | UseDropZoneParamsWithoutRef;

const DROP_ZONE_BASE_ATTRIBUTES = {
    'aria-dropeffect': 'copy' as DataTransfer['dropEffect'],
    tabIndex: 0,
    role: 'button',
};

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

export type UseDropZoneState = UseDropZoneStateWithRef | UseDropZoneStateWithoutRef;

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

function getSeparatedItems(accept: UseDropZoneAccept, dataTransfer: DataTransfer) {
    const items = dataTransfer.items;
    const accepted: DataTransferItem[] = [];
    const rejected: DataTransferItem[] = [];

    for (const item of items) {
        if (
            accept.some((acceptedTypePattern) => typeMatchesPattern(item.type, acceptedTypePattern))
        ) {
            accepted.push(item);
        } else {
            rejected.push(item);
        }
    }

    return {accepted, rejected};
}

export function useDropZone(params: UseDropZoneParamsWithRef): UseDropZoneStateWithRef;
export function useDropZone(params: UseDropZoneParamsWithoutRef): UseDropZoneStateWithoutRef;
export function useDropZone({
    accept,
    disabled,
    onDrop,
    onDropRejected,
    onDropAccepted,
    ref,
}: UseDropZoneParams): UseDropZoneState {
    const [isDraggingOver, setIsDraggingOver] = React.useState(false);
    const [isInvalidDrag, setIsInvalidDrag] = React.useState(false);
    const nestingCounterRef = React.useRef<number>(0);

    const handleDragEnterNative = React.useCallback(
        (event: DragEvent) => {
            nestingCounterRef.current++;
            const dataTransfer = event.dataTransfer;

            if (disabled || !dataTransfer) {
                return;
            }
            const {accepted} = getSeparatedItems(accept, dataTransfer);

            if (accepted.length < 1) {
                setIsInvalidDrag(true);
                return;
            }

            event.dataTransfer.dropEffect = DROP_ZONE_BASE_ATTRIBUTES['aria-dropeffect'];

            setIsDraggingOver(true);
        },
        [accept, disabled],
    );

    const handleDragEnter = React.useCallback(
        (event: React.DragEvent) => {
            handleDragEnterNative(event.nativeEvent);
        },
        [handleDragEnterNative],
    );

    const handleDragOverNative = React.useCallback(
        (event: DragEvent) => {
            const dataTransfer = event.dataTransfer;

            if (disabled || !dataTransfer) {
                return;
            }

            if (!isInvalidDrag) {
                event.dataTransfer.dropEffect = DROP_ZONE_BASE_ATTRIBUTES['aria-dropeffect'];
            }

            event.preventDefault();
        },
        [disabled, isInvalidDrag],
    );

    const handleDragOver = React.useCallback(
        (event: React.DragEvent) => {
            handleDragOverNative(event.nativeEvent);
        },
        [handleDragOverNative],
    );

    const handleDragLeaveNative = React.useCallback((_event: DragEvent) => {
        nestingCounterRef.current--;

        if (nestingCounterRef.current !== 0) {
            return;
        }

        setIsDraggingOver(false);
        setIsInvalidDrag(false);
    }, []);

    const handleDragLeave = React.useCallback(
        (event: React.DragEvent) => {
            handleDragLeaveNative(event.nativeEvent);
        },
        [handleDragLeaveNative],
    );

    const handleDropNative = React.useCallback(
        (event: DragEvent) => {
            setIsDraggingOver(false);
            setIsInvalidDrag(false);
            nestingCounterRef.current = 0;

            if (disabled) {
                return;
            }

            event.preventDefault();

            const dataTransfer = event.dataTransfer;

            if (!dataTransfer?.items) {
                return;
            }

            const {accepted, rejected} = getSeparatedItems(accept, dataTransfer);

            onDropAccepted?.(accepted);
            onDropRejected?.(rejected);

            if (accepted.length > 0) {
                onDrop(dataTransfer.items);
            }
        },
        [accept, disabled, onDrop, onDropAccepted, onDropRejected],
    );

    const handleDrop = React.useCallback(
        (event: React.DragEvent) => {
            handleDropNative(event.nativeEvent);
        },
        [handleDropNative],
    );

    React.useEffect(() => {
        const dropZoneElement = ref?.current;

        if (!dropZoneElement) {
            return undefined;
        }

        dropZoneElement.addEventListener('dragenter', handleDragEnterNative);
        dropZoneElement.addEventListener('dragover', handleDragOverNative);
        dropZoneElement.addEventListener('dragleave', handleDragLeaveNative);
        dropZoneElement.addEventListener('drop', handleDropNative);

        for (const [attribute, value] of Object.entries(DROP_ZONE_BASE_ATTRIBUTES)) {
            dropZoneElement.setAttribute(attribute, value.toString());
        }

        return () => {
            dropZoneElement.removeEventListener('dragenter', handleDragEnterNative);
            dropZoneElement.removeEventListener('dragover', handleDragOverNative);
            dropZoneElement.removeEventListener('dragleave', handleDragLeaveNative);
            dropZoneElement.removeEventListener('drop', handleDropNative);
        };
    }, [handleDragEnterNative, handleDragLeaveNative, handleDragOverNative, handleDropNative, ref]);

    const droppableProps = React.useMemo<UseDropZoneDroppableProps>(
        () => ({
            ...DROP_ZONE_BASE_ATTRIBUTES,
            onDragEnter: handleDragEnter,
            onDragOver: handleDragOver,
            onDragLeave: handleDragLeave,
            onDrop: handleDrop,
        }),
        [handleDragEnter, handleDragOver, handleDragLeave, handleDrop],
    );

    const getDroppableProps = React.useCallback(() => droppableProps, [droppableProps]);

    if (ref) {
        return {
            isDraggingOver,
            isInvalidDrag,
        };
    }

    return {
        isDraggingOver,
        getDroppableProps,
        isInvalidDrag,
    };
}
