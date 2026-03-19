import * as React from 'react';

import {normalizeMaxFilesCount} from '../../../hooks/lab/useDropZone/utils';

import {FileDropZoneProvider, useFileZoneContext} from './FileDropZone.Provider';
import {cnFileDropZone} from './FileDropZone.classname';
import {FileDropZoneButton} from './parts/FileDropZone.Button';
import {FileDropZoneDescription} from './parts/FileDropZone.Description';
import {FileDropZoneIcon} from './parts/FileDropZone.Icon';
import {FileDropZoneTitle} from './parts/FileDropZone.Title';
import type {FileDropZoneContainerProps, FileDropZoneProps} from './types';

import './FileDropZone.scss';

const FileDropZoneContent = ({className, children, qa}: FileDropZoneContainerProps) => {
    const {
        isDraggingOver,
        isInvalidDrag,
        disabled,
        errorMessage,
        validationState,
        getDroppableProps,
        onKeyDown,
    } = useFileZoneContext();

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
            data-qa={qa}
            onKeyDown={onKeyDown}
            className={cnFileDropZone(
                {
                    'drag-hover': isDraggingOver,
                    'invalid-drag': isInvalidDrag,
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
    ({children, className, maxFilesCount, multiple, qa, ...restProps}: FileDropZoneProps) => {
        const normalizedMaxFiles = multiple ? normalizeMaxFilesCount(maxFilesCount) : 1;
        return (
            <FileDropZoneProvider
                maxFilesCount={normalizedMaxFiles}
                multiple={multiple}
                {...restProps}
            >
                <FileDropZoneContent className={className} qa={qa}>
                    {children}
                </FileDropZoneContent>
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
