'use client';

import React from 'react';

import {CircleCheck, CircleInfo, Thunderbolt, TriangleExclamation, Xmark} from '@gravity-ui/icons';

import {useCloseOnTimeout} from '../../../hooks/private';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {IconProps} from '../../Icon';
import {block} from '../../utils/cn';
import i18n from '../i18n';
import type {InternalToastProps, ToastAction, ToastTheme} from '../types';

import './Toast.scss';

const b = block('toast');
const DEFAULT_TIMEOUT = 5000;
const TITLE_ICONS: Record<ToastTheme, IconProps['data'] | null> = {
    normal: null,
    info: CircleInfo,
    success: CircleCheck,
    warning: TriangleExclamation,
    danger: TriangleExclamation,
    utility: Thunderbolt,
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
    if (!actions || !actions.length) {
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
                        size="l"
                        view={view}
                        width="auto"
                    >
                        {label}
                    </Button>
                );
            })}
        </div>
    );
}

interface RenderIconProps {
    theme?: ToastTheme;
}

function renderIconByType({theme}: RenderIconProps) {
    if (!theme || !TITLE_ICONS[theme]) {
        return null;
    }

    return <Icon data={TITLE_ICONS[theme]!} size={20} className={b('icon', {[theme]: true})} />;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastUnitedProps>(function Toast(props, ref) {
    const {
        name,
        content,
        actions,
        title,
        className,
        theme = 'normal',
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
        theme,
    };

    const hasTitle = Boolean(title);
    const hasContent = Boolean(content);

    const icon = renderIcon ? renderIcon(props) : renderIconByType({theme});
    return (
        <div ref={ref} className={b(mods, className)} {...closeOnTimeoutProps} data-toast>
            {icon && <div className={b('icon-container')}>{icon}</div>}
            <div className={b('container')}>
                {hasTitle && <h3 className={b('title')}>{title}</h3>}
                {isClosable && (
                    <Button
                        size="s"
                        view="flat"
                        className={b('btn-close')}
                        onClick={onClose}
                        extraProps={{'aria-label': i18n('label_close-button')}}
                    >
                        <Icon data={Xmark} />
                    </Button>
                )}
                {hasContent && (
                    <div className={b('content', {'without-title': !hasTitle})}>{content}</div>
                )}
                {renderActions({actions, onClose})}
            </div>
        </div>
    );
});
