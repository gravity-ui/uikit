import * as React from 'react';

export type UseDropZoneAccept = string[];

export interface UseDropZoneParams {
    accept: UseDropZoneAccept;
    ref?: React.RefObject<HTMLElement>;
    disabled?: boolean;
    onDrop: (items: DataTransferItemList) => void;
}

const DROP_ZONE_BASE_ATTRIBUTES = {
    'aria-dropeffect': 'copy' as DataTransfer['dropEffect'],
    tabIndex: 0,
};

export interface DroppableProps extends Required<typeof DROP_ZONE_BASE_ATTRIBUTES> {
    onDragEnter: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent) => void;
}

export interface UseDropZoneState {
    isDraggingOver: boolean;
    getDroppableProps: () => DroppableProps;
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

function eventItemTypesAcceptable(accept: UseDropZoneAccept, event: DragEvent): boolean {
    const items = event.dataTransfer?.items;

    if (!items) {
        return false;
    }

    for (const {type} of items) {
        if (accept.some((acceptedTypePattern) => typeMatchesPattern(type, acceptedTypePattern))) {
            return true;
        }
    }

    return false;
}

export function useDropZone({accept, disabled, onDrop, ref}: UseDropZoneParams): UseDropZoneState {
    const [isDraggingOver, setIsDraggingOver] = React.useState(false);

    const handleDragEnterNative = React.useCallback(
        (event: DragEvent) => {
            if (disabled || !event.dataTransfer || !eventItemTypesAcceptable(accept, event)) {
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
            if (disabled || !event.dataTransfer || !eventItemTypesAcceptable(accept, event)) {
                return;
            }

            event.dataTransfer.dropEffect = DROP_ZONE_BASE_ATTRIBUTES['aria-dropeffect'];

            event.preventDefault();
        },
        [accept, disabled],
    );

    const handleDragOver = React.useCallback(
        (event: React.DragEvent) => {
            handleDragOverNative(event.nativeEvent);
        },
        [handleDragOverNative],
    );

    const handleDragLeaveNative = React.useCallback(
        (event: DragEvent) => {
            if (disabled || !eventItemTypesAcceptable(accept, event)) {
                return;
            }

            setIsDraggingOver(false);
        },
        [accept, disabled],
    );

    const handleDragLeave = React.useCallback(
        (event: React.DragEvent) => {
            handleDragLeaveNative(event.nativeEvent);
        },
        [handleDragLeaveNative],
    );

    const handleDropNative = React.useCallback(
        (event: DragEvent) => {
            if (disabled || !eventItemTypesAcceptable(accept, event)) {
                return;
            }

            setIsDraggingOver(false);

            const items = event.dataTransfer?.items;

            if (!items) {
                return;
            }

            onDrop(items);
        },
        [accept, disabled, onDrop],
    );

    const handleDrop = React.useCallback(
        (event: React.DragEvent) => {
            handleDropNative(event.nativeEvent);
        },
        [handleDropNative],
    );

    React.useEffect(() => {
        const dropZoneElement = ref?.current;

        dropZoneElement?.addEventListener('dragenter', handleDragEnterNative);
        dropZoneElement?.addEventListener('dragover', handleDragOverNative);
        dropZoneElement?.addEventListener('dragleave', handleDragLeaveNative);
        dropZoneElement?.addEventListener('drop', handleDropNative);

        for (const [attribute, value] of Object.entries(DROP_ZONE_BASE_ATTRIBUTES)) {
            dropZoneElement?.setAttribute(attribute, value.toString());
        }

        return () => {
            dropZoneElement?.removeEventListener('dragenter', handleDragEnterNative);
            dropZoneElement?.removeEventListener('dragover', handleDragOverNative);
            dropZoneElement?.removeEventListener('dragleave', handleDragLeaveNative);
            dropZoneElement?.removeEventListener('drop', handleDropNative);
        };
    }, [handleDragEnterNative, handleDragLeaveNative, handleDragOverNative, handleDropNative, ref]);

    return {
        isDraggingOver,
        getDroppableProps: () => {
            return {
                ...DROP_ZONE_BASE_ATTRIBUTES,
                onDragEnter: handleDragEnter,
                onDragOver: handleDragOver,
                onDragLeave: handleDragLeave,
                onDrop: handleDrop,
            };
        },
    };
}
