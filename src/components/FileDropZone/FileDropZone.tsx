import * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';

import {FileDropZoneProvider, useFileZoneContext} from './FileDropZone.Provider';
import {cnFileDropZone} from './FileDropZone.classname';
import {FileDropZoneQa} from './constants';
import {FileDropZoneButton} from './parts/FileDropZone.Button';
import {FileDropZoneDescription} from './parts/FileDropZone.Description';
import {FileDropZoneIcon} from './parts/FileDropZone.Icon';
import {FileDropZoneTitle} from './parts/FileDropZone.Title';
import type {FileDropZoneContainerProps, FileDropZoneProps} from './types';
import {areFileDropZonePropsEqual} from './utils';

import './FileDropZone.scss';

const FileDropZoneContent = ({className, children, qa}: FileDropZoneContainerProps) => {
    const {
        isDraggingOver,
        isInvalidDrag,
        disabled,
        errorMessage,
        validationState,
        getDroppableProps,
        triggerProps,
        controlProps,
        accept,
        multiple,
        onKeyDown,
    } = useFileZoneContext();

    const hasError = Boolean(errorMessage);

    const handleClick = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (!disabled && !event.defaultPrevented) {
                triggerProps.onClick();
            }
        },
        [disabled, triggerProps],
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            // Enter or Space on a focusable child (e.g. a custom button) belongs to that child.
            if (event.target === event.currentTarget) {
                onKeyDown(event);
            }
        },
        [onKeyDown],
    );

    const handleInputClick = React.useCallback((event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    }, []);

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
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : 0}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
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
            <input
                {...controlProps}
                multiple={multiple}
                accept={accept.length > 0 ? accept.join(',') : undefined}
                data-qa={FileDropZoneQa.FILE_INPUT}
                onClick={handleInputClick}
            />
        </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
};

const BaseFileDropZone = React.memo<FileDropZoneProps>((rawProps: FileDropZoneProps) => {
    const {children, className, qa, ...restProps} = useDefaultProps('FileDropZone', rawProps);

    return (
        <FileDropZoneProvider {...restProps}>
            <FileDropZoneContent className={className} qa={qa}>
                {children}
            </FileDropZoneContent>
        </FileDropZoneProvider>
    );
}, areFileDropZonePropsEqual);

BaseFileDropZone.displayName = 'FileDropZone';

export const FileDropZone = Object.assign(BaseFileDropZone, {
    Icon: FileDropZoneIcon,
    Title: FileDropZoneTitle,
    Description: FileDropZoneDescription,
    Button: FileDropZoneButton,
});
