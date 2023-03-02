import React from 'react';
import {block} from '../../utils/cn';
import {useCloseOnTimeout} from '../../utils/useCloseOnTimeout';
import {Icon, IconProps} from '../../Icon';
import {Button} from '../../Button';
import {Alarm, CrossIcon, Info, Success} from '../../icons';
import type {ToastAction, ToastProps, ToastType} from '../types';
import i18n from '../i18n';

import './Toast.scss';

const b = block('toast');
const FADE_IN_LAST_ANIMATION_NAME = 'toast-display-end';
const FADE_OUT_LAST_ANIMATION_NAME = 'toast-hide-end';
const DEFAULT_TIMEOUT = 5000;
const CROSS_ICON_SIZE = 12;
const TITLE_ICONS: Record<ToastType, IconProps['data']> = {
    info: Info,
    success: Success,
    warning: Alarm,
    error: Alarm,
};

interface ToastInnerProps {
    removeCallback: VoidFunction;
    mobile?: boolean;
}

interface ToastUnitedProps extends ToastProps, ToastInnerProps {}

enum ToastStatus {
    Creating = 'creating',
    ShowingIndents = 'showing-indents',
    ShowingHeight = 'showing-height',
    Hiding = 'hiding',
    Shown = 'shown',
}

interface UseToastHeightProps {
    isOverride: boolean;
    status: ToastStatus;
}

function getHeight(ref: React.RefObject<HTMLDivElement>) {
    return ref.current?.offsetHeight;
}

function useToastHeight({isOverride, status}: UseToastHeightProps) {
    const [height, setHeight] = React.useState<number | undefined>(undefined);

    const ref = React.useRef<HTMLDivElement>(null);

    const heightRef = React.useRef<number>();
    React.useEffect(() => {
        // ATTENTION: getting `offsetHeight` is important for correct transaction of `height`
        // HOW THIS WORKS:
        // On the step of changing state to `ShowingIndent` we set class with height `transition`
        // We need now to apply this styles, to achieve this we're calling `offsetHeight`, to force repaint
        // Now we call changing state to `ShowingHeight` and changing height now happen with transition
        if (status === ToastStatus.ShowingIndents) {
            heightRef.current = getHeight(ref);
        }
    }, [status]);

    React.useEffect(() => {
        const height =
            typeof heightRef.current === 'number' && !isOverride
                ? heightRef.current
                : getHeight(ref);

        setHeight(height);
    }, [isOverride]);

    const style: React.CSSProperties = {};
    if (height && status !== ToastStatus.ShowingIndents && status !== ToastStatus.Shown) {
        style.height = height;
    }

    return {style, ref};
}

interface UseToastStatusProps {
    onRemove: VoidFunction;
}

function useToastStatus({onRemove}: UseToastStatusProps) {
    const [status, setStatus] = React.useState<ToastStatus>(ToastStatus.Creating);

    React.useEffect(() => {
        if (status === ToastStatus.Creating) {
            setStatus(ToastStatus.ShowingIndents);
        } else if (status === ToastStatus.ShowingIndents) {
            setStatus(ToastStatus.ShowingHeight);
        }
    }, [status]);

    const onFadeInAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (e) => {
        if (e.animationName === FADE_IN_LAST_ANIMATION_NAME) {
            setStatus(ToastStatus.Shown);
        }
    };

    const onFadeOutAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (e) => {
        if (e.animationName === FADE_OUT_LAST_ANIMATION_NAME) {
            onRemove();
        }
    };

    let onAnimationEnd;
    if (status === ToastStatus.ShowingHeight) {
        onAnimationEnd = onFadeInAnimationEnd;
    }
    if (status === ToastStatus.Hiding) {
        onAnimationEnd = onFadeOutAnimationEnd;
    }

    const handleClose = React.useCallback(() => {
        setStatus(ToastStatus.Hiding);
    }, []);

    return {status, containerProps: {onAnimationEnd}, handleClose};
}

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
        content,
        actions,
        title,
        className,
        type,
        renderIcon,
        autoHiding: timeoutProp = DEFAULT_TIMEOUT,
        isClosable = true,
        isOverride = false,
        mobile = false,
    } = props;

    const {
        status,
        containerProps: statusProps,
        handleClose,
    } = useToastStatus({onRemove: props.removeCallback});

    const heightProps = useToastHeight({isOverride, status});

    const timeout = typeof timeoutProp === 'number' ? timeoutProp : undefined;
    const closeOnTimeoutProps = useCloseOnTimeout<HTMLDivElement>({onClose: handleClose, timeout});

    const mods = {
        mobile,
        appearing: status === ToastStatus.ShowingIndents || status === ToastStatus.ShowingHeight,
        'show-animation': status === ToastStatus.ShowingHeight,
        'hide-animation': status === ToastStatus.Hiding,
        created: status !== ToastStatus.Creating,
        [type || 'default']: true,
    };

    const icon = renderIcon ? renderIcon(props) : renderIconByType({type});

    return (
        <div
            className={b(mods, className)}
            {...statusProps}
            {...heightProps}
            {...closeOnTimeoutProps}
        >
            {icon && <div className={b('icon-container')}>{icon}</div>}
            <div className={b('container')}>
                <h3 className={b('title')}>{title}</h3>
                {isClosable && (
                    <Button
                        view="flat-secondary"
                        className={b('btn-close')}
                        onClick={handleClose}
                        extraProps={{'aria-label': i18n('label_close-button')}}
                    >
                        <Icon data={CrossIcon} size={CROSS_ICON_SIZE} />
                    </Button>
                )}
                {Boolean(content) && <div className={b('content')}>{content}</div>}
                {renderActions({actions, onClose: handleClose})}
            </div>
        </div>
    );
}
