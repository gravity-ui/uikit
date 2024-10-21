'use client';

import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard} from '../CopyToClipboard';
import type {CopyToClipboardStatus} from '../CopyToClipboard';
import {Icon} from '../Icon';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Label.scss';

const b = block('label');

type SizeMapType = {copyIconSize: number; closeIconSize: number};

const sizeMap: Record<string, SizeMapType> = {
    xs: {copyIconSize: 12, closeIconSize: 12},
    s: {copyIconSize: 14, closeIconSize: 14},
    m: {copyIconSize: 16, closeIconSize: 16},
};

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
    /** Use native clipboard methods */
    nativeCopy?: boolean;
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
    value?: string;
    /** Label color */
    theme?: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'utility' | 'unknown' | 'clear';
    /** Label type (plain, with copy text button or with close button) */
    type?: 'default' | 'copy' | 'close';
    /** Label size */
    size?: 'xs' | 's' | 'm';
    /** Browser title for Label */
    title?: string;
}

export const Label = React.forwardRef(function Label(
    props: LabelProps,
    ref: React.Ref<HTMLDivElement>,
) {
    const {
        type = 'default',
        theme = 'normal',
        size = 'xs',
        title,
        icon,
        children,
        onCloseClick,
        className,
        disabled,
        copyText,
        nativeCopy,
        closeButtonLabel,
        copyButtonLabel,
        interactive = false,
        value,
        onCopy,
        onClick,
        qa,
    } = props;
    const hasContent = Boolean(children !== '' && React.Children.count(children) > 0);

    const typeClose = type === 'close' && hasContent;
    const typeCopy = type === 'copy' && hasContent;

    const hasOnClick = typeof onClick === 'function';
    const hasCopy = Boolean(typeCopy && copyText);
    const isInteractive = (hasOnClick || hasCopy || interactive) && !disabled;
    const {copyIconSize, closeIconSize} = sizeMap[size];

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
                    })}
                >
                    <ClipboardIcon status={status || 'pending'} size={copyIconSize} />
                </button>
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
                    })}
                >
                    <Icon size={closeIconSize} data={Xmark} />
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
                        interactive: isInteractive,
                        disabled,
                    },
                    className,
                )}
                title={title}
                data-qa={qa}
            >
                {startIcon}
                {hasOnClick ? (
                    <button
                        disabled={disabled}
                        type="button"
                        onClick={onClick}
                        className={b('main-button')}
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
            <CopyToClipboard text={copyText} onCopy={onCopy} timeout={1000} nativeCopy={nativeCopy}>
                {(status) => renderLabel(status)}
            </CopyToClipboard>
        );
    }

    return renderLabel();
});
