'use client';

import React from 'react';

import ReactCopyToClipboard from 'react-copy-to-clipboard';

import {copyText} from '../../utils/copyText';

import type {CopyToClipboardProps, CopyToClipboardStatus} from './types';

const INITIAL_STATUS: CopyToClipboardStatus = 'pending';

export function CopyToClipboard(props: CopyToClipboardProps) {
    const {children, text, options, timeout, nativeCopy, onCopy} = props;

    const textRef = React.useRef(text);
    const [status, setStatus] = React.useState<CopyToClipboardStatus>(INITIAL_STATUS);

    const timerIdRef = React.useRef<number>();

    const content = React.useMemo<React.ReactElement<React.HTMLAttributes<HTMLElement>>>(
        () => children(status),
        [children, status],
    );

    const handleCopy = React.useCallback<Required<ReactCopyToClipboard.Props>['onCopy']>(
        (copyText, result) => {
            setStatus(result ? 'success' : 'error');
            window.clearTimeout(timerIdRef.current);
            timerIdRef.current = window.setTimeout(() => setStatus(INITIAL_STATUS), timeout);
            onCopy?.(copyText, result);
        },
        [onCopy, timeout],
    );

    const onClickWithCopy: React.MouseEventHandler<HTMLElement> = React.useCallback(
        (event) => {
            textRef.current = text;

            copyText(text).then(
                () => {
                    if (text === textRef.current) {
                        handleCopy(text, true);

                        if (typeof content.props?.onClick === 'function') {
                            content.props.onClick(event);
                        }
                    }
                },
                () => {
                    if (text === textRef.current) {
                        handleCopy(text, false);

                        if (typeof content.props?.onClick === 'function') {
                            content.props.onClick(event);
                        }
                    }
                },
            );
        },
        [content.props, handleCopy, text],
    );

    React.useEffect(() => () => window.clearTimeout(timerIdRef.current), []);

    if (!React.isValidElement(content)) {
        throw new Error('Content must be a valid react element');
    }

    if (nativeCopy) {
        return React.cloneElement(content, {
            onClick: onClickWithCopy,
        });
    }

    return (
        <ReactCopyToClipboard text={text} onCopy={handleCopy} options={options}>
            {content}
        </ReactCopyToClipboard>
    );
}
