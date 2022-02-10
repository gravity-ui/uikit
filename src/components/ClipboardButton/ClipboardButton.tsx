import React from 'react';
import {CopyToClipboard} from '../CopyToClipboard';
import {QAProps} from '../types';
import {FakeButton} from './FakeButton';

export interface ClipboardButtonProps extends QAProps {
    /** Text to copy */
    text: string;
    /** Icon size in pixels */
    size?: number;
    /** Element CSS class */
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
