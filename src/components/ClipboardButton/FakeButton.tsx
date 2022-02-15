import React, {MouseEventHandler} from 'react';
import {block} from '../utils/cn';
import {useButtonHandlers} from '../utils/useButtonHandlers';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboardStatus} from '../CopyToClipboard';
import {ClipboardButtonProps} from './ClipboardButton';
import './ClipboardButton.scss';

const b = block('clipboard-button');

const DEFAULT_ICON_SIZE = 24;

interface FakeButtonProps extends Pick<ClipboardButtonProps, 'className' | 'size' | 'qa'> {
    status: CopyToClipboardStatus;
    onClick?: MouseEventHandler<HTMLSpanElement>;
}

export function FakeButton({
    status,
    className,
    qa,
    size = DEFAULT_ICON_SIZE,
    onClick,
}: FakeButtonProps) {
    const {onKeyDown} = useButtonHandlers<HTMLSpanElement>(onClick);

    return (
        <span
            tabIndex={0}
            role="button"
            className={b(null, className)}
            data-qa={qa}
            onClick={onClick}
            onKeyDown={onKeyDown}
        >
            <ClipboardIcon status={status} size={size} className={b('icon')} />
        </span>
    );
}
