import * as React from 'react';

import type {UseFileInputResult} from '../../../hooks';
import {useActionHandlers, useFileInput} from '../../../hooks';
import {FILE_REJECTION_REASONS, useDropZone} from '../../../hooks/lab/useDropZone';
import type {FileRejection, UseDropZoneStateWithoutRef} from '../../../hooks/lab/useDropZone';

import type {DropZoneFileRejection, FileDropZoneProps} from './FileDropZone';

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
        >,
        UseFileInputResult,
        UseDropZoneStateWithoutRef {
    onKeyDown: React.KeyboardEventHandler;
    maxFilesCount: number;
}

const FileDropZoneContext = React.createContext<FileDropZoneContextValue | null>(null);

export interface FileDropZoneProviderProps
    extends Pick<
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
    > {
    maxFilesCount: number;
}

export const FileDropZoneProvider = ({
    accept,
    onUpdate,
    onReject,
    title,
    description,
    buttonText,
    icon,
    errorIcon,
    multiple,
    disabled,
    errorMessage,
    validationState,
    children,
    maxFilesCount,
}: FileDropZoneProviderProps) => {
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

    const {isDraggingOver, isInvalidDrag, getDroppableProps} = useDropZone({
        accept,
        disabled,
        multiple,
        maxFilesCount,
        onDropRejected: handleRejectDrop,
        onDropAccepted: handleDrop,
    });

    const onFileInputUpdate = React.useCallback(
        (files: File[]) => {
            if (files.length > maxFilesCount) {
                const acceptedFiles = files.slice(0, maxFilesCount);
                onUpdate(acceptedFiles);

                if (onReject) {
                    const rejectedFiles = files.slice(maxFilesCount).map((file) => ({
                        file,
                        reasons: [FILE_REJECTION_REASONS.TOO_MANY_FILES],
                    }));
                    onReject(rejectedFiles);
                }
            } else {
                onUpdate(files);
            }
        },
        [onUpdate, onReject, maxFilesCount],
    );

    const {controlProps, triggerProps} = useFileInput({onUpdate: onFileInputUpdate});

    const {onKeyDown} = useActionHandlers(triggerProps.onClick);

    const contextValue = React.useMemo(
        () => ({
            accept,
            title,
            description,
            buttonText,
            maxFilesCount,
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
            maxFilesCount,
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
