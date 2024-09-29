'use client';

import React from 'react';

import {ActionTooltip} from '../ActionTooltip';
import {Button} from '../Button';
import type {ButtonProps, ButtonSize} from '../Button';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard} from '../CopyToClipboard';
import type {CopyToClipboardProps, CopyToClipboardStatus} from '../CopyToClipboard/types';

import i18n from './i18n';

export interface ClipboardButtonProps
    extends Omit<CopyToClipboardProps, 'children'>,
        Omit<ClipboardButtonComponentProps, 'status' | 'onClick'> {}

interface ClipboardButtonComponentProps
    extends Omit<ButtonProps, 'href' | 'component' | 'target' | 'rel' | 'loading'> {
    status: CopyToClipboardStatus;
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
        ...rest
    } = props;

    const buttonIcon = (
        <Button.Icon>
            <ClipboardIcon size={ButtonSizeToIconSize[size]} status={status} />
        </Button.Icon>
    );

    return (
        <ActionTooltip
            disabled={!hasTooltip}
            title={status === 'success' ? tooltipSuccessText : tooltipInitialText}
        >
            <Button
                view={view}
                size={size}
                extraProps={{
                    'aria-label': tooltipInitialText,
                    ...extraProps,
                }}
                {...rest}
            >
                {iconPosition === 'start' ? buttonIcon : null}
                {children}
                {iconPosition === 'end' ? buttonIcon : null}
            </Button>
        </ActionTooltip>
    );
};

export function ClipboardButton(props: ClipboardButtonProps) {
    const {text, timeout = DEFAULT_TIMEOUT, onCopy, options, nativeCopy, ...buttonProps} = props;
    return (
        <CopyToClipboard
            text={text}
            timeout={timeout}
            onCopy={onCopy}
            options={options}
            nativeCopy={nativeCopy}
        >
            {(status) => <ClipboardButtonComponent {...buttonProps} status={status} />}
        </CopyToClipboard>
    );
}
