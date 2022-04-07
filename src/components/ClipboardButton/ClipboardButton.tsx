import React, {useEffect, useRef} from 'react';
import {Button} from '../Button';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard, CopyToClipboardProps} from '../CopyToClipboard';
import {QAProps} from '../types';
import {block} from '../utils/cn';

import './ClipboardButton.scss';

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

const b = block('clipboard-button');

const DEFAULT_ICON_SIZE = 24;

export function ClipboardButton({
    text,
    size = DEFAULT_ICON_SIZE,
    className,
    qa,
    onCopy,
}: ClipboardButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        buttonRef?.current?.style.setProperty('--yc-button-height', `${size}px`);
    }, [size]);

    return (
        <CopyToClipboard text={text} timeout={1000} onCopy={onCopy}>
            {(status) => (
                <Button ref={buttonRef} view="flat" className={b(null, className)} qa={qa}>
                    <Button.Icon>
                        <ClipboardIcon status={status} size={size} className={b('icon')} />
                    </Button.Icon>
                </Button>
            )}
        </CopyToClipboard>
    );
}
