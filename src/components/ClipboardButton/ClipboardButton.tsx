import React from 'react';
import {block} from '../utils/cn';
import {CopyToClipboard} from '../CopyToClipboard';
import {ClipboardIcon} from '../ClipboardIcon';
import {QAProps} from '../types';
import './ClipboardButton.scss';

export interface ClipboardButtonProps extends QAProps {
    /** Текст для копирования */
    text: string;
    /** Размер иконки в пикселях */
    size?: number;
    /** CSS-класс элемента */
    className?: string;
}

const b = block('clipboard-button');
const DEFAULT_ICON_SIZE = 24;

export function ClipboardButton({
    text,
    size = DEFAULT_ICON_SIZE,
    className,
    qa,
}: ClipboardButtonProps) {
    return (
        <CopyToClipboard text={text} timeout={1000}>
            {(status) => (
                <span className={b(null, className)} data-qa={qa}>
                    <ClipboardIcon status={status} size={size} className={b('icon')} />
                </span>
            )}
        </CopyToClipboard>
    );
}
