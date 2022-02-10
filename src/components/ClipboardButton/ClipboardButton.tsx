import React from 'react';
import {CopyToClipboard, CopyToClipboardProps} from '../CopyToClipboard';
import {QAProps} from '../types';
import {FakeButton} from './FakeButton';

export interface ClipboardButtonProps extends QAProps {
    /** Text to copy */
    text: string;
    /** Icon size in pixels */
    size?: number;
    /** Element CSS class */
    className?: string;
    /** Handler that would be invoked after success copy to clipboard */
    onCopy?: CopyToClipboardProps['onCopy'];
}

export function ClipboardButton({text, size, className, qa, onCopy}: ClipboardButtonProps) {
    return (
        <CopyToClipboard text={text} timeout={1000} onCopy={onCopy}>
            {(status) => (
                <FakeButton className={className} data-qa={qa} status={status} size={size} />
            )}
        </CopyToClipboard>
    );
}
