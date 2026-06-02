import * as React from 'react';

import type {UseFileInputResult} from '../../../hooks';
import {useActionHandlers, useFileInput} from '../../../hooks';
import {useDropZone} from '../../../hooks/lab/useDropZone';
import type {UseDropZoneStateWithoutRef} from '../../../hooks/lab/useDropZone';

import type {DropZoneFileRejection, FileDropZoneProps} from './types';
import {FILE_REJECTION_REASONS, getSeparatedItems} from './utils';
import type {FileRejection} from './utils';

interface FileDropZoneContextValue
    extends Pick<
            FileDropZoneProps,
            | 'accept'
            | 'title'
            | 'description'
            | 'buttonText'
            | 'icon'
            | 'errorIcon'
            | 'errorMessage'
            | 'validationState'
            | 'disabled'
            | 'multiple'
        >,
        UseFileInputResult,
        UseDropZoneStateWithoutRef {
    onKeyDown: React.KeyboardEventHandler;
    isInvalidDrag: boolean;
}

const FileDropZoneContext = React.createContext<FileDropZoneContextValue | null>(null);

export type FileDropZoneProviderProps = Pick<
    FileDropZoneProps,
    | 'accept'
    | 'onUpdate'
    | 'onReject'
    | 'title'
    | 'description'
    | 'buttonText'
    | 'icon'
    | 'errorIcon'
    | 'multiple'
    | 'disabled'
    | 'errorMessage'
    | 'validationState'
    | 'children'
>;

export const FileDropZoneProvider = ({
    accept,
    onUpdate,
    onReject,
    title,
    description,
    buttonText,
    icon,
    errorIcon,
    disabled,
    errorMessage,
    validationState,
    children,
    multiple,
}: FileDropZoneProviderProps) => {
    const [isInvalidDrag, setIsInvalidDrag] = React.useState(false);

    const handleDrop = React.useCallback(
        (items: DataTransferItem[]): void => {
            const files: File[] = [];

            for (const item of items) {
                const file = item.getAsFile();

                if (!file) {
                    continue;
                }

                files.push(file);
            }

            onUpdate(files);
        },
        [onUpdate],
    );

    const handleRejectDrop = React.useCallback(
        (items: FileRejection[]): void => {
            if (onReject) {
                const fileRejection: DropZoneFileRejection[] = [];

                for (const rejectionObject of items) {
                    const {item, reasons} = rejectionObject;
                    const file = item.getAsFile();

                    if (!file) {
                        continue;
                    }

                    fileRejection.push({file, reasons});
                }
                onReject(fileRejection);
            }
        },
        [onReject],
    );

    const handleDragEnter = React.useCallback(
        (event: DragEvent) => {
            const dataTransfer = event.dataTransfer;

            if (!dataTransfer?.items) {
                return;
            }

            const {accepted} = getSeparatedItems(dataTransfer, {
                accept,
                multiple,
            });

            setIsInvalidDrag(accepted.length < 1);
        },
        [accept, multiple],
    );

    const handleDropEvent = React.useCallback(
        (event: DragEvent) => {
            const dataTransfer = event.dataTransfer;

            setIsInvalidDrag(false);

            if (!dataTransfer?.items) {
                return;
            }

            const {accepted, rejected} = getSeparatedItems(dataTransfer, {
                accept,
                multiple,
            });

            if (accepted.length > 0) {
                handleDrop(accepted);
            }

            if (rejected.length > 0) {
                handleRejectDrop(rejected);
            }
        },
        [accept, handleDrop, handleRejectDrop, multiple],
    );

    const {isDraggingOver, getDroppableProps} = useDropZone({
        disabled,
        onDragEnter: handleDragEnter,
        onDrop: handleDropEvent,
    });

    React.useEffect(() => {
        if (!isDraggingOver) {
            setIsInvalidDrag(false);
        }
    }, [isDraggingOver]);

    const handleFileInputUpdate = React.useCallback(
        (files: File[]) => {
            if (multiple || files.length <= 1) {
                onUpdate(files);
                return;
            }

            onUpdate(files.slice(0, 1));

            if (onReject) {
                onReject(
                    files.slice(1).map((file) => ({
                        file,
                        reasons: [FILE_REJECTION_REASONS.TOO_MANY_FILES],
                    })),
                );
            }
        },
        [multiple, onReject, onUpdate],
    );

    const {controlProps, triggerProps} = useFileInput({onUpdate: handleFileInputUpdate});

    const {onKeyDown} = useActionHandlers(disabled ? undefined : triggerProps.onClick);

    const contextValue = React.useMemo(
        () => ({
            accept,
            title,
            description,
            buttonText,
            multiple,
            disabled,
            icon,
            errorIcon,
            errorMessage,
            validationState,
            controlProps,
            triggerProps,
            isDraggingOver,
            isInvalidDrag,
            getDroppableProps,
            onKeyDown,
        }),
        [
            accept,
            title,
            description,
            buttonText,
            multiple,
            disabled,
            icon,
            errorIcon,
            errorMessage,
            validationState,
            controlProps,
            triggerProps,
            isDraggingOver,
            isInvalidDrag,
            getDroppableProps,
            onKeyDown,
        ],
    );

    return (
        <FileDropZoneContext.Provider value={contextValue}>{children}</FileDropZoneContext.Provider>
    );
};

export const useFileZoneContext = (): FileDropZoneContextValue => {
    const contextValue = React.useContext(FileDropZoneContext);

    if (contextValue === null) {
        throw new Error('FileDropZone context not found');
    }

    return contextValue;
};
