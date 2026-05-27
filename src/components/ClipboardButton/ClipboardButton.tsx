'use client';

import * as React from 'react';

import {ActionTooltip} from '../ActionTooltip';
import {Button} from '../Button';
import type {ButtonButtonProps, ButtonSize} from '../Button';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard} from '../CopyToClipboard';
import type {
    CopyToClipboardProps,
    CopyToClipboardStatus,
    OnCopyHandler,
} from '../CopyToClipboard/types';
import {block} from '../utils/cn';

import i18n from './i18n';

import './ClipboardButton.scss';

const b = block('clipboard-button');

export interface ClipboardButtonProps
    extends Omit<CopyToClipboardProps, 'children'>,
        Omit<ClipboardButtonComponentProps, 'status' | 'closeDelay'> {}

interface ClipboardButtonComponentProps extends Omit<ButtonButtonProps, 'onCopy'> {
    status: CopyToClipboardStatus;
    closeDelay: number | undefined;
    /** Disable tooltip. Tooltip won't be shown */
    hasTooltip?: boolean;
    /** Text shown before copy */
    tooltipInitialText?: string;
    /** Text shown after copy */
    tooltipSuccessText?: string;
    /** Position of clipboard icon */
    iconPosition?: 'start' | 'end';
    /** Custom icon */
    icon?: React.ReactNode;
}

const DEFAULT_TIMEOUT = 1200;

const ButtonSizeToIconSize: Record<ButtonSize, number> = {xs: 12, s: 16, m: 16, l: 16, xl: 20};

const ClipboardButtonComponent = (props: ClipboardButtonComponentProps) => {
    const {t} = i18n.useTranslation();
    const {
        size = 'm',
        hasTooltip = true,
        tooltipInitialText = t('startCopy'),
        tooltipSuccessText = t('endCopy'),
        status,
        view = 'flat',
        children,
        iconPosition = 'start',
        closeDelay,
        icon,
        ...rest
    } = props;

    const buttonIcon = (
        <Button.Icon className={b('icon')}>
            {icon ?? <ClipboardIcon size={ButtonSizeToIconSize[size]} status={status} />}
        </Button.Icon>
    );

    return (
        <ActionTooltip
            title={status === 'success' ? tooltipSuccessText : tooltipInitialText}
            disabled={!hasTooltip}
            closeDelay={closeDelay}
        >
            <Button view={view} size={size} aria-label={tooltipInitialText} {...rest}>
                {iconPosition === 'start' ? buttonIcon : null}
                {children}
                {iconPosition === 'end' ? buttonIcon : null}
            </Button>
        </ActionTooltip>
    );
};

export function ClipboardButton(props: ClipboardButtonProps) {
    const {
        text,
        timeout = DEFAULT_TIMEOUT,
        onCopy,
        hasTooltip = true,
        onMouseEnter,
        onFocus,
        ...buttonProps
    } = props;

    const timerIdRef = React.useRef<number>();
    const [tooltipCloseDelay, setTooltipCloseDelay] = React.useState<number | undefined>(undefined);
    const [tooltipDisabled, setTooltipDisabled] = React.useState(false);

    React.useEffect(() => window.clearTimeout(timerIdRef.current), []);

    const handleCopy: OnCopyHandler = React.useCallback(
        (text, result) => {
            onCopy?.(text, result);
            setTooltipDisabled(false);
            setTooltipCloseDelay(timeout);

            window.clearTimeout(timerIdRef.current);

            timerIdRef.current = window.setTimeout(() => {
                setTooltipDisabled(true);
            }, timeout);
        },
        [onCopy, timeout],
    );

    const resetTooltip = React.useCallback(() => {
        if (tooltipDisabled) {
            setTooltipDisabled(false);
            setTooltipCloseDelay(undefined);
        }
    }, [tooltipDisabled]);

    const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        (event) => {
            onMouseEnter?.(event);
            resetTooltip();
        },
        [onMouseEnter, resetTooltip],
    );

    const handleFocus: React.FocusEventHandler<HTMLButtonElement> = React.useCallback(
        (event) => {
            onFocus?.(event);
            resetTooltip();
        },
        [onFocus, resetTooltip],
    );

    return (
        <CopyToClipboard text={text} timeout={timeout} onCopy={handleCopy}>
            {(status) => (
                <ClipboardButtonComponent
                    {...buttonProps}
                    closeDelay={tooltipCloseDelay}
                    hasTooltip={hasTooltip && !tooltipDisabled}
                    status={status}
                    onMouseEnter={handleMouseEnter}
                    onFocus={handleFocus}
                />
            )}
        </CopyToClipboard>
    );
}
