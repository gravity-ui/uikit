import React from 'react';

import {Button} from '../Button';
import type {ButtonProps} from '../Button';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard} from '../CopyToClipboard';
import {CopyToClipboardStatus} from '../CopyToClipboard/types';
import type {CopyToClipboardBaseProps} from '../CopyToClipboard/types';
import {Tooltip} from '../Tooltip';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import i18n from './i18n';

import './ClipboardButton.scss';

export interface ClipboardButtonProps
    extends CopyToClipboardBaseProps,
        Omit<ClipboardButtonComponentProps, 'status' | 'onClick'>,
        QAProps {
    /** Time to restore initial state, ms */
    timeout?: number;
}

interface ClipboardButtonComponentProps extends QAProps {
    /** Icon size in pixels */
    size?: number;
    /** Element CSS class */
    className?: string;
    status: CopyToClipboardStatus;
    onClick?: ButtonProps['onClick'];
    /** Disable tooltip. Tooltip won't be shown */
    hasTooltip?: boolean;
    /** Text shown before copy */
    tooltipInitialText?: string;
    /** Text shown after copy */
    tooltipSuccessText?: string;
}

const b = block('clipboard-button');

const DEFAULT_ICON_SIZE = 24;
const DEFAULT_TIMEOUT = 1000;

const ClipboardButtonComponent = (props: ClipboardButtonComponentProps) => {
    const {
        size = DEFAULT_ICON_SIZE,
        className,
        qa,
        hasTooltip = true,
        tooltipInitialText = i18n('startCopy'),
        tooltipSuccessText = i18n('endCopy'),
        status,
        onClick,
    } = props;
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(() => {
        buttonRef?.current?.style.setProperty('--yc-button-height', `${size}px`);
    }, [size]);

    return (
        <Tooltip
            disabled={!hasTooltip}
            content={
                status === CopyToClipboardStatus.Success ? tooltipSuccessText : tooltipInitialText
            }
        >
            <Button
                ref={buttonRef}
                view="flat"
                className={b(null, className)}
                qa={qa}
                onClick={onClick}
            >
                <Button.Icon>
                    <ClipboardIcon status={status} size={size} className={b('icon')} />
                </Button.Icon>
            </Button>
        </Tooltip>
    );
};

export function ClipboardButton(props: ClipboardButtonProps) {
    const {text, timeout = DEFAULT_TIMEOUT, onCopy, options, ...buttonProps} = props;
    return (
        <CopyToClipboard text={text} timeout={timeout} onCopy={onCopy} options={options}>
            {(status) => <ClipboardButtonComponent {...buttonProps} status={status} />}
        </CopyToClipboard>
    );
}
