import type React from 'react';

import type ReactCopyToClipboard from 'react-copy-to-clipboard';

export type CopyToClipboardStatus = 'pending' | 'success' | 'error';

export type OnCopyHandler = (text: string, result: boolean) => void;

export type CopyToClipboardContent = (status: CopyToClipboardStatus) => React.ReactElement;

export interface CopyToClipboardProps {
    text: string;
    timeout?: number;
    children: CopyToClipboardContent;
    onCopy?: OnCopyHandler;
    options?: ReactCopyToClipboard.Options;
}
