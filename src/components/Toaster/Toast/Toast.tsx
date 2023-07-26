import React from 'react';

import {CircleCheckFill, CircleInfoFill, TriangleExclamationFill, Xmark} from '@gravity-ui/icons';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {IconProps} from '../../Icon';
import {block} from '../../utils/cn';
import {useCloseOnTimeout} from '../../utils/useCloseOnTimeout';
import {ToastAction} from '../ToastAction/ToastAction';
import i18n from '../i18n';
import type {InternalToastProps, ToastAction as ToastActionProps, ToastType} from '../types';

import './Toast.scss';

const b = block('toast');
const DEFAULT_TIMEOUT = 5000;
const TITLE_ICONS: Record<ToastType, IconProps['data']> = {
    info: CircleInfoFill,
    success: CircleCheckFill,
    warning: TriangleExclamationFill,
    error: TriangleExclamationFill,
};

interface ToastInnerProps {
    removeCallback: (name: string) => void;
    mobile?: boolean;
}

interface ToastUnitedProps extends InternalToastProps, ToastInnerProps {}

interface RenderActionsProps {
    actions?: ToastActionProps[];
    onClose: VoidFunction;
}

function renderActions({actions, onClose}: RenderActionsProps) {
    if (!actions) {
        return null;
    }

    return (
        <div className={b('actions')}>
            {actions.map(
                (
                    {label, onClick, view = 'outlined', removeAfterClick = true, loadingAfterClick},
                    index,
                ) => {
                    const onActionClick = () => {
                        onClick();
                        if (removeAfterClick) {
                            onClose();
                        }
                    };

                    return (
                        <ToastAction
                            key={`${label}__${index}`}
                            onClick={onActionClick}
                            view={view}
                            label={label}
                            onClose={onClose}
                            removeAfterClick={removeAfterClick}
                            loadingAfterClick={loadingAfterClick}
                        />
                    );
                },
            )}
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

    return <Icon data={TITLE_ICONS[type]} size={20} className={b('icon', {[type]: true})} />;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastUnitedProps>(function Toast(props, ref) {
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
        <div ref={ref} className={b(mods, className)} {...closeOnTimeoutProps} data-toast>
            {icon && <div className={b('icon-container')}>{icon}</div>}
            <div className={b('container')}>
                <h3 className={b('title')}>{title}</h3>
                {isClosable && (
                    <Button
                        size={'s'}
                        view="flat"
                        className={b('btn-close')}
                        onClick={onClose}
                        extraProps={{'aria-label': i18n('label_close-button')}}
                    >
                        <Icon data={Xmark} />
                    </Button>
                )}
                {Boolean(content) && <div className={b('content')}>{content}</div>}
                {renderActions({actions, onClose})}
            </div>
        </div>
    );
});
