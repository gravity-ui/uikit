import * as React from 'react';

import {useActionHandlers, useDropZone, useFileInput} from '../../hooks';
import type {UseDropZoneState, UseFileInputResult} from '../../hooks';

import type {FileDropZoneProps} from './FileDropZone';
import {cnFileDropZone} from './FileDropZone.classname';

interface FileDropZoneContextValue
    extends Pick<
            FileDropZoneProps,
            | 'title'
            | 'description'
            | 'buttonText'
            | 'multiple'
            | 'icon'
            | 'errorIcon'
            | 'errorMessage'
            | 'validationState'
        >,
        UseFileInputResult,
        UseDropZoneState {}

const FileDropZoneContext = React.createContext<FileDropZoneContextValue | null>(null);

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
    className,
    errorMessage,
    validationState,
    children,
}: FileDropZoneProps) => {
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

            onUpdate(files);
        },
        [onUpdate],
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
            title,
            description,
            buttonText,
            multiple,
            icon,
            errorIcon,
            errorMessage,
            validationState,
            controlProps,
            triggerProps,
            isDraggingOver,
            getDroppableProps,
        }),
        [
            title,
            description,
            buttonText,
            multiple,
            icon,
            errorIcon,
            errorMessage,
            validationState,
            controlProps,
            triggerProps,
            isDraggingOver,
            getDroppableProps,
        ],
    );

    const hasError = Boolean(errorMessage);

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
        <FileDropZoneContext.Provider value={contextValue}>
            <div
                {...getDroppableProps()}
                onKeyDown={onKeyDown}
                className={cnFileDropZone(
                    {
                        'drag-hover': isDraggingOver,
                        disabled: disabled,
                        error: hasError || validationState === 'invalid',
                    },
                    className,
                )}
            >
                {children}
            </div>
        </FileDropZoneContext.Provider>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
};

export const useFileZoneContext = (): FileDropZoneContextValue => {
    const contextValue = React.useContext(FileDropZoneContext);

    if (contextValue === null) {
        throw new Error('FileDropZone context not found');
    }

    return contextValue;
};
