'use client';

import * as React from 'react';

import {CircleInfo, Xmark} from '@gravity-ui/icons';

import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard} from '../CopyToClipboard';
import type {CopyToClipboardStatus} from '../CopyToClipboard';
import {Icon} from '../Icon';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import {LabelQa} from './constants';

import './Label.scss';

const b = block('label');

const iconSizeMap: Record<NonNullable<LabelProps['size']>, number> = {
    xs: 12,
    s: 14,
    m: 16,
} as const;

export interface LabelProps extends QAProps {
    /** Label icon (at start) */
    icon?: React.ReactNode;
    /** Disabled state */
    disabled?: boolean;
    /** Handler for click on close button */
    onCloseClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    /** Text to copy */
    copyText?: string;
    /** `aria-label` of close button */
    closeButtonLabel?: string;
    /** `aria-label` of copy button */
    copyButtonLabel?: string;
    /** Handler for copy event */
    onCopy?(text: string, result: boolean): void;
    /** Handler for click on label itself */
    onClick?(event: React.MouseEvent<HTMLElement>): void;
    /** Class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Display hover */
    interactive?: boolean;
    /** Label value (shows as "children : value") */
    value?: React.ReactNode;
    /** Label color */
    theme?: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'utility' | 'unknown' | 'clear';
    /** Label type (plain, with copy text button, with close button, or with info icon) */
    type?: 'default' | 'copy' | 'close' | 'info';
    /** Label size */
    size?: 'xs' | 's' | 'm';
    /** Container width behavior */
    width?: 'auto';
    /** Browser title for Label */
    title?: string;
    loading?: boolean;
}

export const Label = React.forwardRef(function Label(
    props: LabelProps,
    ref: React.Ref<HTMLDivElement>,
) {
    const {
        type = 'default',
        theme = 'normal',
        size = 'xs',
        width,
        title,
        icon,
        children,
        onCloseClick,
        className,
        disabled,
        copyText,
        closeButtonLabel,
        copyButtonLabel,
        interactive = false,
        value,
        onCopy,
        onClick,
        qa,
        loading = false,
    } = props;
    const hasContent = Boolean(children !== '' && React.Children.count(children) > 0);

    const typeClose = type === 'close' && hasContent;
    const typeCopy = type === 'copy' && hasContent;
    const typeInfo = type === 'info';

    const hasOnClick = typeof onClick === 'function';
    const hasCopy = Boolean(typeCopy && copyText);
    const isInteractive = (hasOnClick || hasCopy || typeInfo || interactive) && !disabled;

    const iconSize = iconSizeMap[size];

    const startIcon = icon && (
        <div className={b('addon', {side: hasContent ? 'start' : undefined, type: 'icon'})}>
            {icon}
        </div>
    );
    const content = hasContent && (
        <div className={b('text')}>
            <div className={b('content')}>{children}</div>
            {Boolean(value) && (
                <div className={b('value')}>
                    <div className={b('separator')}>:</div>
                    <div className={b('key')}>{value}</div>
                </div>
            )}
        </div>
    );

    const renderLabel = (status?: CopyToClipboardStatus) => {
        let actionButton: React.ReactNode;

        if (typeCopy) {
            actionButton = (
                <button
                    type="button"
                    aria-label={copyButtonLabel || undefined}
                    onClick={hasOnClick ? onClick : undefined}
                    disabled={disabled}
                    className={b('addon', {
                        side: 'end',
                        type: 'button',
                        action: hasOnClick ? 'click' : 'copy',
                    })}
                    data-qa={LabelQa.copyButton}
                >
                    <ClipboardIcon status={status || 'pending'} size={iconSize} />
                </button>
            );
        } else if (typeInfo) {
            actionButton = (
                <div
                    className={b('addon', {
                        side: 'end',
                        type: 'icon',
                    })}
                >
                    <Icon size={iconSize} data={CircleInfo} />
                </div>
            );
        } else if (typeClose) {
            actionButton = (
                <button
                    type="button"
                    onClick={onCloseClick}
                    aria-label={closeButtonLabel || undefined}
                    disabled={disabled}
                    className={b('addon', {
                        side: 'end',
                        type: 'button',
                        action: 'close',
                    })}
                    data-qa={LabelQa.closeButton}
                >
                    <Icon size={iconSize} data={Xmark} />
                </button>
            );
        }

        return (
            <div
                ref={ref}
                className={b(
                    {
                        theme,
                        size,
                        width,
                        interactive: isInteractive,
                        disabled,
                    },
                    className,
                )}
                title={title}
                data-qa={qa}
            >
                {!disabled && loading && <div className={b('animation-container')} />}
                {startIcon}
                {hasOnClick ? (
                    <button
                        disabled={disabled}
                        type="button"
                        onClick={onClick}
                        className={b('main-button')}
                        data-qa={LabelQa.mainButton}
                    >
                        {content}
                    </button>
                ) : (
                    content
                )}
                {actionButton}
            </div>
        );
    };

    if (hasCopy && copyText && !hasOnClick) {
        return (
            <CopyToClipboard text={copyText} onCopy={onCopy} timeout={1000}>
                {(status) => renderLabel(status)}
            </CopyToClipboard>
        );
    }

    return renderLabel();
});
