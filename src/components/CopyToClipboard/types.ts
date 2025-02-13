import type * as React from 'react';

export type CopyToClipboardStatus = 'pending' | 'success' | 'error';

export type OnCopyHandler = (text: string, result: boolean) => void;

export type CopyToClipboardContent = (status: CopyToClipboardStatus) => React.ReactElement;

export interface CopyToClipboardProps {
    text: string | (() => string);
    timeout?: number;
    /** Child element should have `onClick` handler to work properly */
    children: React.ReactElement | CopyToClipboardContent;
    onCopy?: OnCopyHandler;
}
