import type ReactCopyToClipboard from 'react-copy-to-clipboard';

export type CopyToClipboardStatus = 'pending' | 'success' | 'error';

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
