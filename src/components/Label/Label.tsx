import React from 'react';
import {block} from '../utils/cn';
import {CopyToClipboard, CopyToClipboardStatus} from '../CopyToClipboard';
import {ClipboardIcon} from '../ClipboardIcon';
import {Icon} from '../Icon';
import {CrossIcon} from '../icons/CrossIcon';
import './Label.scss';

const b = block('label');

interface LabelOwnProps {
    /** Left icon */
    icon?: React.ReactNode;
    /** Disabled statement */
    disabled?: boolean;
    /** Handle on close button click */
    onClose?(event: React.MouseEvent<HTMLDivElement>): void;
    /** Text to be copied */
    copyText?: string;
    /** Handler on copy button click */
    onCopy?(text: string, result: boolean): void;
    /** Handler on label click */
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    /** ClassName of label */
    className?: string;
    /** ClassName of label's text */
    textClassName?: string;
    /** Content */
    children?: React.ReactNode;
    /** Does label react on hover */
    interactive?: boolean;
}

interface LabelDefaultProps {
    /** Theme of label */
    theme: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'unknown';
    /** Type of label (regular, with copy of text or with close button) */
    type: 'default' | 'copy' | 'close';
    /** Size of label */
    size: 's' | 'm';
    /** Style of corners (regular or with rounded corners) */
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
        textClassName,
        disabled,
        copyText,
        interactive = false,
        onCopy,
        onClick,
    } = props;

    const typeDefault = type === 'default';
    const typeClose = type === 'close';
    const typeCopy = type === 'copy';

    // handle onClick event only for labels with default theme
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

    const content = <div className={b('text', textClassName)}>{children}</div>;

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
        <div
            onClick={onClose}
            className={b('icon', {
                right: true,
                cross: true,
            })}
        >
            <Icon size={closeIconSize} data={CrossIcon} />
        </div>
    );

    const renderLabel = (status?: CopyToClipboardStatus) => {
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
