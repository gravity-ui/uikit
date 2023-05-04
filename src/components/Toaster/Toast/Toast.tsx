import React from 'react';
import {block} from '../../utils/cn';
import {useCloseOnTimeout} from '../../utils/useCloseOnTimeout';
import {Icon, IconProps} from '../../Icon';
import {Button} from '../../Button';
import {Alarm, CrossIcon, Info, Success} from '../../icons';
import type {InternalToastProps, ToastAction, ToastType} from '../types';
import i18n from '../i18n';

import './Toast.scss';

const b = block('toast');
const DEFAULT_TIMEOUT = 5000;
const CROSS_ICON_SIZE = 12;
const TITLE_ICONS: Record<ToastType, IconProps['data']> = {
    info: Info,
    success: Success,
    warning: Alarm,
    error: Alarm,
};

interface ToastInnerProps {
    removeCallback: (name: string) => void;
    mobile?: boolean;
}

interface ToastUnitedProps extends InternalToastProps, ToastInnerProps {}

interface RenderActionsProps {
    actions?: ToastAction[];
    onClose: VoidFunction;
}

function renderActions({actions, onClose}: RenderActionsProps) {
    if (!actions) {
        return null;
    }

    return (
        <div className={b('actions')}>
            {actions.map(({label, onClick, view = 'outlined', removeAfterClick = true}, index) => {
                const onActionClick = () => {
                    onClick();
                    if (removeAfterClick) {
                        onClose();
                    }
                };

                return (
                    <Button
                        key={`${label}__${index}`}
                        className={b('action')}
                        onClick={onActionClick}
                        type="button"
                        view={view}
                    >
                        {label}
                    </Button>
                );
            })}
        </div>
    );
}

interface RenderIconProps {
    type?: ToastType;
}

function renderIconByType({type}: RenderIconProps) {
    if (!type) {
        return null;
    }

    return <Icon data={TITLE_ICONS[type]} className={b('icon', {[type]: true})} />;
}

export function Toast(props: ToastUnitedProps) {
    const {
        name,
        content,
        actions,
        title,
        className,
        type,
        renderIcon,
        autoHiding: timeoutProp = DEFAULT_TIMEOUT,
        isClosable = true,
        mobile = false,
        removeCallback,
        containerRef,
    } = props;

    const onClose = React.useCallback(() => removeCallback(name), [removeCallback, name]);
    const timeout = typeof timeoutProp === 'number' ? timeoutProp : undefined;
    const closeOnTimeoutProps = useCloseOnTimeout<HTMLDivElement>({onClose, timeout});

    const mods = {
        mobile,
        [type || 'default']: true,
    };

    const icon = renderIcon ? renderIcon(props) : renderIconByType({type});

    return (
        <div ref={containerRef} className={b(mods, className)} {...closeOnTimeoutProps}>
            {icon && <div className={b('icon-container')}>{icon}</div>}
            <div className={b('container')}>
                <h3 className={b('title')}>{title}</h3>
                {isClosable && (
                    <Button
                        view="flat-secondary"
                        className={b('btn-close')}
                        onClick={onClose}
                        extraProps={{'aria-label': i18n('label_close-button')}}
                    >
                        <Icon data={CrossIcon} size={CROSS_ICON_SIZE} />
                    </Button>
                )}
                {Boolean(content) && <div className={b('content')}>{content}</div>}
                {renderActions({actions, onClose})}
            </div>
        </div>
    );
}
