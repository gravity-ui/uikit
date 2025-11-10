import * as React from 'react';

import type {IconData} from '../..';
import type {UseDropZoneAccept} from '../../hooks/useDropZone';
import type {BaseInputControlProps} from '../controls/types';

import {FileDropZoneProvider} from './FileDropZone.Provider';
import {cnFileDropZone} from './FileDropZone.classname';
import {FileDropZoneButton} from './parts/FileDropZone.Button';
import {FileDropZoneDescription} from './parts/FileDropZone.Description';
import {FileDropZoneIcon} from './parts/FileDropZone.Icon';
import {FileDropZoneTitle} from './parts/FileDropZone.Title';

import './FileDropZone.scss';

export interface FileDropZoneProps extends Pick<BaseInputControlProps, 'validationState'> {
    accept: UseDropZoneAccept;
    onAdd: (files: File[]) => void;
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

const BaseFileDropZone = React.memo<FileDropZoneProps>(
    ({children, ...restProps}: FileDropZoneProps) => {
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

        return (
            <FileDropZoneProvider
                {...restProps}
                className={cnFileDropZone({
                    'default-layout': typeof children === 'undefined',
                })}
            >
                {content}
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
