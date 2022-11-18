import React, {ReactNode} from 'react';
import {block} from '../utils/cn';
import {CopyToClipboard, CopyToClipboardStatus} from '../CopyToClipboard';
import {ClipboardIcon} from '../ClipboardIcon';
import {Icon} from '../Icon';
import {CrossIcon} from '../icons/CrossIcon';
import {Button, ButtonProps, ButtonSize} from '../Button';
import './Label.scss';

const b = block('label');

type SizeMapType = {copyIconSize: number; closeIconSize: number; buttonSize: ButtonSize};

const sizeMap: Record<string, SizeMapType> = {
    xs: {copyIconSize: 12, closeIconSize: 8, buttonSize: 's'},
    s: {copyIconSize: 12, closeIconSize: 8, buttonSize: 's'},
    m: {copyIconSize: 12, closeIconSize: 8, buttonSize: 'm'},
};

const commonActionButtonProps: ButtonProps = {
    pin: 'brick-round',
    className: b('icon', {
        side: 'right',
        interactive: true,
    }),
};

interface LabelOwnProps {
    /** Label icon (at left) */
    icon?: React.ReactNode;
    /** Disabled state */
    disabled?: boolean;
    /** Handler for click on close button */
    onClose?(event: React.MouseEvent<HTMLButtonElement>): void;
    /** Text to copy */
    copyText?: string;
    /* `aria-label` of close button */
    closeButtonLabel?: string;
    /* `aria-label` of copy button */
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
}

interface LabelDefaultProps {
    /** Label color */
    theme: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'unknown' | 'plain';
    /** Label type (plain, with copy text button or with close button) */
    type: 'default' | 'copy' | 'close';
    /** Label size */
    size: 'xs' | 's' | 'm';
    /** Label appearance (with round corners or plain) */
    style: 'rounded' | 'default';
}

export interface LabelProps extends LabelOwnProps, Partial<LabelDefaultProps> {}

export const Label = React.forwardRef<HTMLDivElement, LabelProps>(function Label(props, ref) {
    const {
        type = 'default',
        theme = 'normal',
        size = 'xs',
        style = 'default',
        icon,
        children,
        onClose,
        className,
        disabled,
        copyText,
        closeButtonLabel,
        copyButtonLabel,
        interactive = false,
        onCopy,
        onClick,
    } = props;

    const hasContent = Boolean(children !== '' && React.Children.count(children) > 0);

    const typeClose = type === 'close' && hasContent;
    const typeCopy = type === 'copy' && hasContent;

    const hasOnClick = Boolean(onClick);
    const hasCopy = Boolean(typeCopy && copyText);
    const isInteractive = hasOnClick || hasCopy || interactive;
    const {copyIconSize, closeIconSize, buttonSize} = sizeMap[size];

    const leftIcon = icon && (
        <div className={b('icon', {side: hasContent ? 'left' : undefined})}>{icon}</div>
    );
    const content = hasContent && <div className={b('text')}>{children}</div>;

    const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (hasOnClick) {
            /* preventing event from bubbling */
            event.stopPropagation();
        }

        if (onClose) onClose(event);
    };

    const renderLabel = (status?: CopyToClipboardStatus) => {
        let actionButton: ReactNode;

        if (typeCopy) {
            actionButton = (
                <Button
                    size={buttonSize}
                    extraProps={{'aria-label': copyButtonLabel || undefined}}
                    {...commonActionButtonProps}
                >
                    <Button.Icon>
                        <ClipboardIcon
                            status={status || CopyToClipboardStatus.Pending}
                            size={copyIconSize}
                        />
                    </Button.Icon>
                </Button>
            );
        } else if (typeClose) {
            actionButton = (
                <Button
                    onClick={onClose ? handleCloseClick : undefined}
                    size={buttonSize}
                    extraProps={{'aria-label': closeButtonLabel || undefined}}
                    {...commonActionButtonProps}
                >
                    <Icon size={closeIconSize} data={CrossIcon} />
                </Button>
            );
        }

        return (
            <div
                ref={ref}
                onClick={hasOnClick ? onClick : undefined}
                className={b(
                    {
                        theme,
                        size,
                        style,
                        type,
                        'is-interactive': isInteractive,
                        'has-right-icon': Boolean(actionButton),
                        'has-left-icon': Boolean(leftIcon),
                        disabled,
                    },
                    className,
                )}
            >
                {leftIcon}
                {content}
                {actionButton}
            </div>
        );
    };

    const handleCopyClick = (event: React.MouseEvent<HTMLDivElement>) => {
        /* preventing event from bubbling */
        event.stopPropagation();
    };

    if (hasCopy && copyText) {
        return (
            <div onClick={handleCopyClick}>
                <CopyToClipboard text={copyText} onCopy={onCopy} timeout={1000}>
                    {(status) => renderLabel(status)}
                </CopyToClipboard>
            </div>
        );
    }

    return renderLabel();
});
