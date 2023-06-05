import React from 'react';

import {Button} from '../Button';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard} from '../CopyToClipboard';
import type {CopyToClipboardBaseProps} from '../CopyToClipboard/types';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './ClipboardButton.scss';

export interface ClipboardButtonProps extends CopyToClipboardBaseProps, QAProps {
    /** Icon size in pixels */
    size?: number;
    /** Element CSS class */
    className?: string;
    /** Time to restore initial state, ms */
    timeout?: number;
}

const b = block('clipboard-button');

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_TIMEOUT = 1000;

export function ClipboardButton({
    text,
    size = DEFAULT_ICON_SIZE,
    className,
    qa,
    onCopy,
    timeout = DEFAULT_TIMEOUT,
    options,
}: ClipboardButtonProps) {
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        buttonRef?.current?.style.setProperty('--yc-button-height', `${size}px`);
    }, [size]);

    return (
        <CopyToClipboard text={text} timeout={timeout} onCopy={onCopy} options={options}>
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
