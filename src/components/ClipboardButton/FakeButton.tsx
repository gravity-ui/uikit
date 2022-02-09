import React from 'react';
import {block} from '../utils/cn';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboardStatus} from '../CopyToClipboard';
import {ClipboardButtonProps} from './ClipboardButton';
import './ClipboardButton.scss';

const b = block('clipboard-button');

const DEFAULT_ICON_SIZE = 24;

interface FakeButtonProps extends Pick<ClipboardButtonProps, 'className' | 'size'> {
    status: CopyToClipboardStatus;
    'data-qa': ClipboardButtonProps['qa'];
}

export function FakeButton({
    status,
    className,
    'data-qa': qa,
    size = DEFAULT_ICON_SIZE,
}: FakeButtonProps) {
    return (
        <span className={b(null, className)} data-qa={qa}>
            <ClipboardIcon status={status} size={size} className={b('icon')} />
        </span>
    );
}
