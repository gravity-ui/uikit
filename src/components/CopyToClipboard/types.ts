import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';

export enum CopyToClipboardStatus {
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
}

export type OnCopyHandler = (text: string, result: boolean) => void;

export type CopyToClipboardContent = (status: CopyToClipboardStatus) => React.ReactElement;

export interface CopyToClipboardBaseProps {
    /** Text to copy */
    text: string;

    /** Handler that would be invoked after copy to clipboard */
    onCopy?: OnCopyHandler;

    /** copy-to-clipboard options */
    options?: ReactCopyToClipboard.Options;
}
