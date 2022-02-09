import React from 'react';
import {CopyToClipboard} from '../CopyToClipboard';
import {QAProps} from '../types';
import {FakeButton} from './FakeButton';

export interface ClipboardButtonProps extends QAProps {
    /** Текст для копирования */
    text: string;
    /** Размер иконки в пикселях */
    size?: number;
    /** CSS-класс элемента */
    className?: string;
}

export function ClipboardButton({text, size, className, qa}: ClipboardButtonProps) {
    return (
        <CopyToClipboard text={text} timeout={1000}>
            {(status) => (
                <FakeButton className={className} data-qa={qa} status={status} size={size} />
            )}
        </CopyToClipboard>
    );
}
