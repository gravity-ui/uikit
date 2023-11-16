import React from 'react';

import {Xmark} from '@gravity-ui/icons';

import {useActionHandlers} from '../../hooks';
import {Button} from '../Button';
import type {ButtonProps, ButtonSize} from '../Button';
import {ClipboardIcon} from '../ClipboardIcon';
import {CopyToClipboard, CopyToClipboardStatus} from '../CopyToClipboard';
import {Icon} from '../Icon';
import type {QAProps} from '../types';
import {block} from '../utils/cn';

import './Label.scss';

const b = block('label');

type SizeMapType = {copyIconSize: number; closeIconSize: number; buttonSize: ButtonSize};

const sizeMap: Record<string, SizeMapType> = {
    xs: {copyIconSize: 12, closeIconSize: 12, buttonSize: 'xs'},
    s: {copyIconSize: 14, closeIconSize: 14, buttonSize: 's'},
    m: {copyIconSize: 16, closeIconSize: 16, buttonSize: 'm'},
};

const commonActionButtonProps: ButtonProps = {
    pin: 'brick-round',
    className: b('addon', {
        side: 'right',
        interactive: true,
    }),
};

interface LabelOwnProps extends QAProps {
    /** Label icon (at left) */
    icon?: React.ReactNode;
    /** Disabled state */
    disabled?: boolean;
    /** Handler for click on close button */
    onClose?(event: React.MouseEvent<HTMLButtonElement>): void;
    /** Text to copy */
    copyText?: string;
    /** `aria-label` of close button */
    closeButtonLabel?: string;
    /** `aria-label` of copy button */
    copyButtonLabel?: string;
    /** Handler for copy event */
    onCopy?(text: string, result: boolean): void;
    /** Handler for click on label itself */
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    /** Class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Display hover */
    interactive?: boolean;
    /** Label value (shows as "children : value") */
    value?: string;
}

interface LabelDefaultProps {
    /** Label color */
    theme: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'utility' | 'unknown' | 'clear';
    /** Label type (plain, with copy text button or with close button) */
    type: 'default' | 'copy' | 'close';
    /** Label size */
    size: 'xs' | 's' | 'm';
}

export interface LabelProps extends LabelOwnProps, Partial<LabelDefaultProps> {}

export const Label = React.forwardRef<HTMLDivElement, LabelProps>(function Label(props, ref) {
    const {
        type = 'default',
        theme = 'normal',
        size = 'xs',
        icon,
        children,
        onClose,
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
    } = props;

    const actionButtonRef = React.useRef<HTMLButtonElement>(null);

    const hasContent = Boolean(children !== '' && React.Children.count(children) > 0);

    const typeClose = type === 'close' && hasContent;
    const typeCopy = type === 'copy' && hasContent;

    const hasOnClick = Boolean(onClick);
    const hasCopy = Boolean(typeCopy && copyText);
    const isInteractive = (hasOnClick || hasCopy || interactive) && !disabled;
    const {copyIconSize, closeIconSize, buttonSize} = sizeMap[size];

    const leftIcon = icon && (
        <div className={b('addon', {side: hasContent ? 'left' : undefined})}>{icon}</div>
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

    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (hasOnClick) {
            /* preventing event from bubbling */
            event.stopPropagation();
        }

        if (onClose) {
            onClose(event);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        /**
         * Triggered only if the handler was triggered on the element itself, and not on the actionButton
         * It is necessary that keyboard navigation works correctly
         */
        if (!actionButtonRef.current?.contains(event.target as Node)) {
            onClick?.(event);
        }
    };

    const {onKeyDown} = useActionHandlers(handleClick);

    const renderLabel = (status?: CopyToClipboardStatus) => {
        let actionButton: React.ReactNode;

        if (typeCopy) {
            actionButton = (
                <Button
                    ref={actionButtonRef}
                    size={buttonSize}
                    extraProps={{'aria-label': copyButtonLabel || undefined}}
                    {...commonActionButtonProps}
                >
                    <Button.Icon>
                        <ClipboardIcon status={status || 'pending'} size={copyIconSize} />
                    </Button.Icon>
                </Button>
            );
        } else if (typeClose) {
            actionButton = (
                <Button
                    ref={actionButtonRef}
                    onClick={onClose ? handleCloseClick : undefined}
                    size={buttonSize}
                    extraProps={{'aria-label': closeButtonLabel || undefined}}
                    {...commonActionButtonProps}
                >
                    <Icon size={closeIconSize} data={Xmark} />
                </Button>
            );
        }

        return (
            <div
                ref={ref}
                role={hasOnClick ? 'button' : undefined}
                tabIndex={hasOnClick ? 0 : undefined}
                onClick={hasOnClick ? handleClick : undefined}
                onKeyDown={hasOnClick ? onKeyDown : undefined}
                className={b(
                    {
                        theme,
                        size,
                        type,
                        'is-interactive': isInteractive,
                        'has-right-addon': Boolean(actionButton),
                        'has-left-addon': Boolean(leftIcon),
                        disabled,
                    },
                    className,
                )}
                data-qa={qa}
            >
                {leftIcon}
                {content}
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
