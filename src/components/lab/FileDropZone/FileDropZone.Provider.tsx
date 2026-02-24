import * as React from 'react';

import type {UseFileInputResult} from '../../../hooks';
import {useActionHandlers, useFileInput} from '../../../hooks';
import {useDropZone} from '../../../hooks/lab/useDropZone';
import type {UseDropZoneStateWithoutRef} from '../../../hooks/lab/useDropZone';

import type {FileDropZoneProps} from './FileDropZone';

interface FileDropZoneContextValue
    extends Pick<
            FileDropZoneProps,
            | 'accept'
            | 'title'
            | 'description'
            | 'buttonText'
            | 'multiple'
            | 'icon'
            | 'errorIcon'
            | 'errorMessage'
            | 'validationState'
            | 'disabled'
        >,
        UseFileInputResult,
        UseDropZoneStateWithoutRef {
    onKeyDown: React.KeyboardEventHandler;
}

const FileDropZoneContext = React.createContext<FileDropZoneContextValue | null>(null);

export interface FileDropZoneProviderProps
    extends Pick<
        FileDropZoneProps,
        | 'accept'
        | 'onUpdate'
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
    > {}

export const FileDropZoneProvider = ({
    accept,
    onUpdate,
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
}: FileDropZoneProviderProps) => {
    const handleDrop = React.useCallback(
        (items: DataTransferItemList): void => {
            const files: File[] = [];

            for (const item of items) {
                const file = item.getAsFile();

                if (!file) {
                    continue;
                }

                files.push(file);
            }

            onUpdate(multiple ? files : [files[0]]);
        },
        [multiple, onUpdate],
    );

    const {isDraggingOver, getDroppableProps} = useDropZone({
        accept,
        disabled,
        onDrop: handleDrop,
    });

    const onFileInputUpdate = React.useCallback(
        (files: File[]) => {
            onUpdate(files);
        },
        [onUpdate],
    );

    const {controlProps, triggerProps} = useFileInput({onUpdate: onFileInputUpdate});

    const {onKeyDown} = useActionHandlers(triggerProps.onClick);

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
