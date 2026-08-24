import * as React from 'react';

import type {UseFileInputResult} from '../../../hooks';
import {useActionHandlers, useFileInput} from '../../../hooks';
import {useDropZone} from '../../../hooks/lab/useDropZone';
import type {UseDropZoneStateWithoutRef} from '../../../hooks/lab/useDropZone';

import type {DropZoneFileRejection, FileDropZoneProps} from './types';
import {getSeparatedItems} from './utils';
import type {FileDropZoneAccept, FileRejection} from './utils';

interface FileDropZoneContextValue
    extends Pick<
            FileDropZoneProps,
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
    accept: FileDropZoneAccept;
    onKeyDown: React.KeyboardEventHandler;
    isInvalidDrag: boolean;
}

const FileDropZoneContext = React.createContext<FileDropZoneContextValue | null>(null);

export type FileDropZoneProviderProps = Pick<
    FileDropZoneProps,
    | 'accept'
    | 'onUpdate'
    | 'onUpdateAccepted'
    | 'onUpdateRejected'
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
    accept = [],
    onUpdate,
    onUpdateAccepted,
    onUpdateRejected,
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

    const handleUpdate = React.useCallback(
        (acceptedItems: File[], rejectedItems: DropZoneFileRejection[]): void => {
            onUpdate?.(acceptedItems, rejectedItems);

            if (acceptedItems.length > 0) {
                onUpdateAccepted?.(acceptedItems);
            }

            if (rejectedItems.length > 0) {
                onUpdateRejected?.(rejectedItems);
            }
        },
        [onUpdate, onUpdateAccepted, onUpdateRejected],
    );

    const getFilesFromItems = React.useCallback((items: DataTransferItem[]): File[] => {
        const files: File[] = [];

        for (const item of items) {
            const file = item.getAsFile();

            if (!file) {
                continue;
            }

            files.push(file);
        }

        return files;
    }, []);

    const getFileRejections = React.useCallback(
        (items: FileRejection[]): DropZoneFileRejection[] => {
            const fileRejections: DropZoneFileRejection[] = [];

            for (const rejectionObject of items) {
                const {item, reasons} = rejectionObject;
                const file = item.getAsFile();

                if (!file) {
                    continue;
                }

                fileRejections.push({file, reasons});
            }

            return fileRejections;
        },
        [],
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
            const acceptedItems = getFilesFromItems(accepted);
            const rejectedItems = getFileRejections(rejected);

            if (acceptedItems.length > 0 || rejectedItems.length > 0) {
                handleUpdate(acceptedItems, rejectedItems);
            }
        },
        [accept, getFileRejections, getFilesFromItems, handleUpdate, multiple],
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
            handleUpdate(files, []);
        },
        [handleUpdate],
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
