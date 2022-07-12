import React from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';

export enum CopyToClipboardStatus {
    Pending = 'pending',
    Success = 'success',
    Error = 'error',
}

export interface CopyToClipboardProps {
    children: (status: CopyToClipboardStatus) => React.ReactElement;
    text: string;
    timeout?: number;
    onCopy?: (text: string, result: boolean) => void;
}

export function CopyToClipboard({children, text, timeout = 1000, onCopy}: CopyToClipboardProps) {
    const [status, setStatus] = React.useState(CopyToClipboard.INITIAL_STATUS);
    const content = React.useMemo(() => children(status), [children, status]);
    const handleCopy = React.useCallback<Required<ReactCopyToClipboard.Props>['onCopy']>(
        (copyText, result) => {
            setStatus(result ? CopyToClipboardStatus.Success : CopyToClipboardStatus.Error);
            onCopy?.(copyText, result);
        },
        [onCopy],
    );

    if (!React.isValidElement(content)) {
        throw new Error('Content must be a valid React element');
    }

    React.useEffect(() => {
        if (status === CopyToClipboard.INITIAL_STATUS) {
            return;
        }
        const timer = window.setTimeout(() => {
            setStatus(CopyToClipboard.INITIAL_STATUS);
        }, timeout);
        return () => {
            window.clearTimeout(timer);
        };
    }, [status]);

    return (
        <ReactCopyToClipboard text={String(text)} onCopy={handleCopy}>
            {content}
        </ReactCopyToClipboard>
    );
}

CopyToClipboard.displayName = 'CopyToClipboard';
CopyToClipboard.INITIAL_STATUS = CopyToClipboardStatus.Pending;
