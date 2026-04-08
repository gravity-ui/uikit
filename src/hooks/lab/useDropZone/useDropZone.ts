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
import {getSeparatedItems, normalizeMaxFilesCount} from './utils';

export function useDropZone(params: UseDropZoneParamsWithRef): UseDropZoneStateWithRef;
export function useDropZone(params: UseDropZoneParamsWithoutRef): UseDropZoneStateWithoutRef;
export function useDropZone({
    accept,
    disabled,
    onDrop,
    onDropRejected,
    onDropAccepted,
    ref,
    multiple,
    maxFilesCount,
}: UseDropZoneParams): UseDropZoneState {
    const [isDraggingOver, setIsDraggingOver] = React.useState(false);
    const [isInvalidDrag, setIsInvalidDrag] = React.useState(false);
    const nestingCounterRef = React.useRef<number>(0);
    const normalizedMaxFiles = multiple ? normalizeMaxFilesCount(maxFilesCount) : 1;

    const handleDragEnterNative = React.useCallback(
        (event: DragEvent) => {
            nestingCounterRef.current++;
            const dataTransfer = event.dataTransfer;

            if (disabled || !dataTransfer) {
                return;
            }
            const {accepted} = getSeparatedItems(dataTransfer, {
                accept,
                maxFilesCount: normalizedMaxFiles,
            });

            if (accepted.length < 1) {
                setIsInvalidDrag(true);
                setIsDraggingOver(true);
                return;
            }

            event.dataTransfer.dropEffect = DROP_ZONE_BASE_ATTRIBUTES['aria-dropeffect'];

            setIsDraggingOver(true);
        },
        [accept, disabled, normalizedMaxFiles],
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

            const {accepted, rejected} = getSeparatedItems(dataTransfer, {
                accept,
                maxFilesCount: normalizedMaxFiles,
            });

            if (onDrop) {
                onDrop(accepted, rejected);
            }
            if (onDropAccepted && accepted.length > 0) {
                onDropAccepted(accepted);
            }
            if (onDropRejected && rejected.length > 0) {
                onDropRejected(rejected);
            }
        },
        [accept, disabled, onDropAccepted, onDropRejected, normalizedMaxFiles, onDrop],
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
