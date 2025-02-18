'use client';

import * as React from 'react';

import {copyText} from './copyText';
import type {CopyToClipboardProps, CopyToClipboardStatus} from './types';

const INITIAL_STATUS: CopyToClipboardStatus = 'pending';

export function CopyToClipboard(props: CopyToClipboardProps) {
    const {children, text, timeout, onCopy} = props;

    const textRef = React.useRef('');
    const [status, setStatus] = React.useState<CopyToClipboardStatus>(INITIAL_STATUS);

    const timerIdRef = React.useRef<number>();

    const content: React.ReactElement<React.HTMLAttributes<HTMLElement>> =
        typeof children === 'function' ? children(status) : children;

    const handleCopy = React.useCallback(
        (copyText: string, result: boolean) => {
            setStatus(result ? 'success' : 'error');
            window.clearTimeout(timerIdRef.current);
            timerIdRef.current = window.setTimeout(() => setStatus(INITIAL_STATUS), timeout);
            onCopy?.(copyText, result);
        },
        [onCopy, timeout],
    );

    const onClickWithCopy: React.MouseEventHandler<HTMLElement> = React.useCallback(
        (event) => {
            const currentText = typeof text === 'function' ? text() : text;
            textRef.current = currentText;

            function copy(result: boolean) {
                if (currentText === textRef.current) {
                    handleCopy(currentText, result);

                    content.props?.onClick?.(event);
                }
            }

            copyText(currentText).then(
                () => {
                    copy(true);
                },
                () => {
                    copy(false);
                },
            );
        },
        [content.props, handleCopy, text],
    );

    React.useEffect(() => () => window.clearTimeout(timerIdRef.current), []);

    if (!React.isValidElement(content)) {
        throw new Error('Content must be a valid react element');
    }

    return React.cloneElement(content, {
        onClick: onClickWithCopy,
    });
}
