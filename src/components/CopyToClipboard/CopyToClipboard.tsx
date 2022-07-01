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
    const resolvedText = React.useMemo(() => String(text), [text]);
    const [status, setStatus] = React.useState(CopyToClipboard.INITIAL_STATUS);
    const content = React.useMemo(() => children(status), [children, status]);
    const timerIdRef = React.useRef<number>();
    const handleCopy = React.useCallback<Required<ReactCopyToClipboard.Props>['onCopy']>(
        (copyText, result) => {
            setStatus(result ? CopyToClipboardStatus.Success : CopyToClipboardStatus.Error);

            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
            }
            timerIdRef.current = window.setTimeout(() => {
                setStatus(CopyToClipboard.INITIAL_STATUS);
                timerIdRef.current = undefined;
            }, timeout);

            onCopy?.(copyText, result);
        },
        [onCopy, timeout],
    );

    if (!React.isValidElement(content)) {
        throw new Error('Content must be a valid React element');
    }

    React.useEffect(() => {
        return () => {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
            }
        };
    }, []);

    return (
        <ReactCopyToClipboard text={resolvedText} onCopy={handleCopy}>
            {content}
        </ReactCopyToClipboard>
    );
}

CopyToClipboard.INITIAL_STATUS = CopyToClipboardStatus.Pending;
