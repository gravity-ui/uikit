import React from 'react';
import {block} from '../utils/cn';
import {CopyToClipboard, CopyToClipboardStatus} from '../CopyToClipboard';
import {ClipboardIcon} from '../ClipboardIcon';
import {Icon} from '../Icon';
import {CrossIcon} from '../icons/CrossIcon';
import {Button} from '../Button';
import './Label.scss';

const b = block('label');

interface LabelOwnProps {
    /** Иконка лейбла (слева) */
    icon?: React.ReactNode;
    /** Состояние disabled */
    disabled?: boolean;
    /** Хендлер на нажатие крестика */
    onClose?(event: React.MouseEvent<HTMLButtonElement>): void;
    /** Текст для копирования */
    copyText?: string;
    /** Хендлер после события копирования */
    onCopy?(text: string, result: boolean): void;
    /** Хендлер на клик на лейбл */
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    /** Дополнительный класс */
    className?: string;
    /** Содержимое */
    children?: React.ReactNode;
    /** Добавить ховер */
    interactive?: boolean;
}

interface LabelDefaultProps {
    /** Цвет лейбла */
    theme: 'normal' | 'info' | 'danger' | 'warning' | 'success' | 'unknown';
    /** Тип лейбла (обычный, с текстом для копирования или с крестиком) */
    type: 'default' | 'copy' | 'close';
    /** Размер лейбла */
    size: 's' | 'm';
    /** Стиль кнопки (с загруленными краями или обычная) */
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
        interactive = false,
        onCopy,
        onClick,
    } = props;

    const typeDefault = type === 'default';
    const typeClose = type === 'close';
    const typeCopy = type === 'copy';

    // Обрабатываем onClick только у лейблов с типом default
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
                        // на данный момент лейблы с действиями могут быть только дефолтными
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
