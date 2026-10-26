import * as React from 'react';

import {DROP_ZONE_BASE_ATTRIBUTES} from './constants';
import type {
    UseDropZoneDroppableProps,
    UseDropZoneParams,
    UseDropZoneParamsWithRef,
    UseDropZoneParamsWithoutRef,
    UseDropZoneState,
    UseDropZoneStateWithRef,
    UseDropZoneStateWithoutRef,
} from './types';

export function useDropZone(params: UseDropZoneParamsWithRef): UseDropZoneStateWithRef;
export function useDropZone(params: UseDropZoneParamsWithoutRef): UseDropZoneStateWithoutRef;
export function useDropZone({
    disabled,
    ref,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
}: UseDropZoneParams): UseDropZoneState {
    const [isDraggingOver, setIsDraggingOver] = React.useState(false);
    const nestingCounterRef = React.useRef<number>(0);

    const handleDragEnterNative = React.useCallback(
        (event: DragEvent) => {
            if (disabled) {
                return;
            }

            nestingCounterRef.current++;

            const dataTransfer = event.dataTransfer;

            if (dataTransfer) {
                dataTransfer.dropEffect = DROP_ZONE_BASE_ATTRIBUTES['aria-dropeffect'];
            }

            setIsDraggingOver(true);
            onDragEnter?.(event);
        },
        [disabled, onDragEnter],
    );

    const handleDragEnter = React.useCallback(
        (event: React.DragEvent) => {
            handleDragEnterNative(event.nativeEvent);
        },
        [handleDragEnterNative],
    );

    const handleDragOverNative = React.useCallback(
        (event: DragEvent) => {
            if (disabled) {
                return;
            }

            const dataTransfer = event.dataTransfer;

            if (dataTransfer) {
                dataTransfer.dropEffect = DROP_ZONE_BASE_ATTRIBUTES['aria-dropeffect'];
            }

            event.preventDefault();
            onDragOver?.(event);
        },
        [disabled, onDragOver],
    );

    const handleDragOver = React.useCallback(
        (event: React.DragEvent) => {
            handleDragOverNative(event.nativeEvent);
        },
        [handleDragOverNative],
    );

    const handleDragLeaveNative = React.useCallback(
        (event: DragEvent) => {
            nestingCounterRef.current = Math.max(nestingCounterRef.current - 1, 0);

            if (nestingCounterRef.current === 0) {
                setIsDraggingOver(false);
            }

            if (disabled) {
                return;
            }

            onDragLeave?.(event);
        },
        [disabled, onDragLeave],
    );

    const handleDragLeave = React.useCallback(
        (event: React.DragEvent) => {
            handleDragLeaveNative(event.nativeEvent);
        },
        [handleDragLeaveNative],
    );

    const handleDropNative = React.useCallback(
        (event: DragEvent) => {
            setIsDraggingOver(false);
            nestingCounterRef.current = 0;

            if (disabled) {
                return;
            }

            event.preventDefault();
            onDrop?.(event);
        },
        [disabled, onDrop],
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
        };
    }

    return {
        isDraggingOver,
        getDroppableProps,
    };
}
