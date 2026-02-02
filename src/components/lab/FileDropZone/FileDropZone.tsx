import * as React from 'react';

import type {BaseInputControlProps} from 'src/components/controls/types';
import type {UseDropZoneAccept} from 'src/hooks/lab/useDropZone';

import type {IconData} from '../..';

import {FileDropZoneProvider, useFileZoneContext} from './FileDropZone.Provider';
import {cnFileDropZone} from './FileDropZone.classname';
import {FileDropZoneButton} from './parts/FileDropZone.Button';
import {FileDropZoneDescription} from './parts/FileDropZone.Description';
import {FileDropZoneIcon} from './parts/FileDropZone.Icon';
import {FileDropZoneTitle} from './parts/FileDropZone.Title';

import './FileDropZone.scss';

export interface FileDropZoneProps extends Pick<BaseInputControlProps, 'validationState'> {
    accept: UseDropZoneAccept;
    onUpdate: (files: File[]) => void;
    title?: string;
    description?: string;
    buttonText?: string;
    icon?: IconData | null;
    errorIcon?: IconData | null;
    className?: string;
    multiple?: boolean;
    disabled?: boolean;
    errorMessage?: string;
    children?: React.ReactNode;
}

interface FileDropZoneContainerProps {
    className?: string;
    children: React.ReactNode;
}

const FileDropZoneContent = ({className, children}: FileDropZoneContainerProps) => {
    const {isDraggingOver, disabled, errorMessage, validationState, getDroppableProps, onKeyDown} =
        useFileZoneContext();

    const hasError = Boolean(errorMessage);

    const content = React.useMemo(() => {
        if (typeof children !== 'undefined') {
            return children;
        }

        return (
            <React.Fragment>
                <FileDropZoneIcon />
                <FileDropZoneTitle />
                <FileDropZoneDescription />
                <FileDropZoneButton />
            </React.Fragment>
        );
    }, [children]);

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
        <div
            {...getDroppableProps()}
            onKeyDown={onKeyDown}
            className={cnFileDropZone(
                {
                    'drag-hover': isDraggingOver,
                    disabled: disabled,
                    error: hasError || validationState === 'invalid',
                    'default-layout': typeof children === 'undefined',
                },
                className,
            )}
        >
            {content}
        </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
};

const BaseFileDropZone = React.memo<FileDropZoneProps>(
    ({children, className, ...restProps}: FileDropZoneProps) => {
        return (
            <FileDropZoneProvider {...restProps}>
                <FileDropZoneContent className={className}>{children}</FileDropZoneContent>
            </FileDropZoneProvider>
        );
    },
);

BaseFileDropZone.displayName = 'FileDropZone';

export const FileDropZone = Object.assign(BaseFileDropZone, {
    Icon: FileDropZoneIcon,
    Title: FileDropZoneTitle,
    Description: FileDropZoneDescription,
    Button: FileDropZoneButton,
});
