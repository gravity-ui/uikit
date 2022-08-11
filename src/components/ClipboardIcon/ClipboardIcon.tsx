import React from 'react';
import {block} from '../utils/cn';
import {a11yHiddenSvgProps} from '../utils/svg';
import {CopyToClipboardStatus} from '../CopyToClipboard/types';

import './ClipboardIcon.scss';

export interface ClipboardIconProps {
    size: number;
    status: CopyToClipboardStatus;
    className?: string;
}

const b = block('clipboard-icon');

const renderStatusPath = (path: string) => (
    <path
        stroke="currentColor"
        fill="transparent"
        className={b('state')}
        strokeWidth="1.5"
        d={path}
    />
);

const STATUS_PATH = {
    [CopyToClipboardStatus.Success]: renderStatusPath('M9.5 13l3 3l5 -5'),
    [CopyToClipboardStatus.Error]: renderStatusPath('M9.5 10l8 8m-8 0l8 -8'),
};

export const ClipboardIcon: React.FC<ClipboardIconProps> = ({size, status, className}) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={b(null, className)}
        {...a11yHiddenSvgProps}
    >
        <path
            fill="currentColor"
            d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
        />
        {status === CopyToClipboardStatus.Pending ? null : STATUS_PATH[status]}
    </svg>
);
