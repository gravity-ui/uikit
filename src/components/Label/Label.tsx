import React from 'react';
import {block} from '../utils/cn';
import {CopyToClipboard} from '../CopyToClipboard';
import {CopyToClipboardStatus} from '../CopyToClipboard/types';
import {ClipboardIcon} from '../ClipboardIcon';
import {Icon} from '../Icon';
import {CrossIcon} from '../icons/CrossIcon';
import {Button} from '../Button';
import './Label.scss';

const b = block('label');

interface LabelOwnProps {
    /** Label icon (at left) */
    icon?: React.ReactNode;
    /** Disabled state */
    disabled?: boolean;
    /** Handler for click on button with cross */
    onClose?(event: React.MouseEvent<HTMLButtonElement>): void;
    /** Text to copy */
    copyText?: string;
    /* `aria-label` of button with cross */
    closeButtonLabel?: string;
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
    theme: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'unknown';
    /** Label type (plain, with copy text button or button with cross) */
    type: 'default' | 'copy' | 'close';
    /** Label size */
    size: 's' | 'm';
    /** Label appearance (with round corners or plain) */
    style: 'rounded' | 'default';
}

export interface LabelProps extends LabelOwnProps, Partial<LabelDefaultProps> {}

export const Label = React.forwardRef<HTMLDivElement, LabelProps>(function Label(props, ref) {
    const {
        type = 'default',
        theme = 'normal',
        size = 's',
        style = 'default',
        icon,
        children,
        onClose,
        className,
        disabled,
        copyText,
        closeButtonLabel,
        interactive = false,
        onCopy,
        onClick,
    } = props;

    const typeDefault = type === 'default';
    const typeClose = type === 'close';
    const typeCopy = type === 'copy';

    // Handle click for `default` type labels
    const hasOnClick = Boolean(onClick) && typeDefault;
    const isInteractive = hasOnClick || interactive;
    const hasAction = typeClose || typeCopy;
    let copyIconSize: number;
    let closeIconSize: number;

    switch (size) {
        case 's':
            copyIconSize = 12;
            closeIconSize = 8;
            break;
        case 'm':
        default:
            copyIconSize = 16;
            closeIconSize = 10;
            break;
    }

    const leftIcon = icon && <div className={b('icon', {left: true})}>{icon}</div>;

    const content = <div className={b('text')}>{children}</div>;

    const renderCopyButton = (status?: CopyToClipboardStatus) => {
        return (
            typeCopy && (
                <div className={b('icon', {right: true, copy: true})}>
                    <ClipboardIcon
                        status={status || CopyToClipboardStatus.Pending}
                        size={copyIconSize}
                    />
                </div>
            )
        );
    };

    const closeButton = typeClose && (
        <Button
            onClick={onClose}
            pin={'brick-round'}
            size={size}
            extraProps={{'aria-label': closeButtonLabel || undefined}}
            className={b('icon', {
                right: true,
                cross: true,
            })}
        >
            <Icon size={closeIconSize} data={CrossIcon} />
        </Button>
    );

    const renderLabel = (status?: CopyToClipboardStatus) => {
        return (
            <div
                ref={ref}
                onClick={hasOnClick ? onClick : undefined}
                className={b(
                    {
                        // only default labels could have actions
                        theme: hasAction ? 'normal' : theme,
                        size,
                        style,
                        type,
                        'is-interactive': isInteractive,
                        'has-right-icon': hasAction,
                        'has-left-icon': Boolean(icon),
                        disabled,
                    },
                    className,
                )}
            >
                {leftIcon}
                {content}
                {renderCopyButton(status)}
                {closeButton}
            </div>
        );
    };

    const handleCopyClick = (event: React.MouseEvent<HTMLDivElement>) => {
        /* preventing event from bubbling */
        event.stopPropagation();
    };

    const labelWithCopy =
        typeCopy && copyText && !disabled ? (
            <div onClick={handleCopyClick}>
                <CopyToClipboard text={copyText} onCopy={onCopy} timeout={1000}>
                    {(status) => renderLabel(status)}
                </CopyToClipboard>
            </div>
        ) : (
            renderLabel()
        );

    return labelWithCopy;
});
