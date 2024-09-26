'use client';

import React from 'react';

import {ActionTooltip} from '../ActionTooltip';
import {Button} from '../Button';
import type {ButtonProps, ButtonSize} from '../Button';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard} from '../CopyToClipboard';
import type {CopyToClipboardProps, CopyToClipboardStatus} from '../CopyToClipboard/types';
import {block} from '../utils/cn';

import i18n from './i18n';

import './ClipboardButton.scss';

const b = block('clipboard-button');

export interface ClipboardButtonProps
    extends Omit<CopyToClipboardProps, 'children'>,
        Omit<ClipboardButtonComponentProps, 'status' | 'timeout' | 'onClick'> {}

interface ClipboardButtonComponentProps
    extends Omit<ButtonProps, 'href' | 'component' | 'target' | 'rel' | 'loading'> {
    status: CopyToClipboardStatus;
    timeout: number;
    /** Disable tooltip. Tooltip won't be shown */
    hasTooltip?: boolean;
    /** Text shown before copy */
    tooltipInitialText?: string;
    /** Text shown after copy */
    tooltipSuccessText?: string;
    /** Position of clipboard icon */
    iconPosition?: 'start' | 'end';
}

const DEFAULT_TIMEOUT = 1000;

const ButtonSizeToIconSize: Record<ButtonSize, number> = {
    xs: 12,
    s: 16,
    m: 16,
    l: 16,
    xl: 20,
};

const ClipboardButtonComponent = (props: ClipboardButtonComponentProps) => {
    const {
        size = 'm',
        hasTooltip = true,
        tooltipInitialText = i18n('startCopy'),
        tooltipSuccessText = i18n('endCopy'),
        status,
        view = 'flat',
        extraProps = {},
        children,
        iconPosition = 'start',
        timeout,
        ...rest
    } = props;

    const buttonIcon = (
        <Button.Icon className={b('icon')}>
            <ClipboardIcon size={ButtonSizeToIconSize[size]} status={status} />
        </Button.Icon>
    );

    const [tooltipTitle, setTooltipTitle] = React.useState(tooltipInitialText);
    const [tooltipCloseDelay, setTooltipCloseDelay] = React.useState<number | undefined>(undefined);

    React.useEffect(() => {
        if (status === 'success') {
            setTooltipTitle(tooltipSuccessText);
            setTooltipCloseDelay(timeout);
        }
    }, [status, timeout, tooltipSuccessText]);

    const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = () => {
        if (status !== 'success') {
            setTooltipTitle(tooltipInitialText);
            setTooltipCloseDelay(undefined);
        }
    };

    return (
        <ActionTooltip disabled={!hasTooltip} title={tooltipTitle} closeDelay={tooltipCloseDelay}>
            <Button
                view={view}
                size={size}
                extraProps={{
                    'aria-label': tooltipInitialText,
                    ...extraProps,
                }}
                {...rest}
                onMouseEnter={handleMouseEnter}
            >
                {iconPosition === 'start' ? buttonIcon : null}
                {children}
                {iconPosition === 'end' ? buttonIcon : null}
            </Button>
        </ActionTooltip>
    );
};

export function ClipboardButton(props: ClipboardButtonProps) {
    const {text, timeout = DEFAULT_TIMEOUT, onCopy, options, ...buttonProps} = props;
    return (
        <CopyToClipboard text={text} timeout={timeout} onCopy={onCopy} options={options}>
            {(status) => (
                <ClipboardButtonComponent {...buttonProps} status={status} timeout={timeout} />
            )}
        </CopyToClipboard>
    );
}
