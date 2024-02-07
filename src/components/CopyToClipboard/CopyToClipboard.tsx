import React from 'react';

import ReactCopyToClipboard from 'react-copy-to-clipboard';

import type {CopyToClipboardProps, CopyToClipboardStatus} from './types';

const INITIAL_STATUS: CopyToClipboardStatus = 'pending';

export function CopyToClipboard(props: CopyToClipboardProps) {
    const {children, text, options, timeout, onCopy} = props;

    const [status, setStatus] = React.useState<CopyToClipboardStatus>(INITIAL_STATUS);

    const timerIdRef = React.useRef<number>();

    const content = React.useMemo(() => children(status), [children, status]);

    const handleCopy = React.useCallback<Required<ReactCopyToClipboard.Props>['onCopy']>(
        (copyText, result) => {
            setStatus(result ? 'success' : 'error');
            window.clearTimeout(timerIdRef.current);
            timerIdRef.current = window.setTimeout(() => setStatus(INITIAL_STATUS), timeout);
            onCopy?.(copyText, result);
        },
        [onCopy, timeout],
    );

    React.useEffect(() => () => window.clearTimeout(timerIdRef.current), []);

    if (!React.isValidElement(content)) {
        throw new Error('Content must be a valid react element');
    }

    return (
        <ReactCopyToClipboard text={text} onCopy={handleCopy} options={options}>
            {content}
        </ReactCopyToClipboard>
    );
}
