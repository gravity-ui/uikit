import React from 'react';
import {block} from '../../utils/cn';
import {Icon} from '../../Icon';
import {Button} from '../../Button';
import {Link} from '../../Link';
import {CrossIcon} from '../../icons/CrossIcon';
import {AttentionToast} from '../../icons/AttentionToast';
import {SuccessToast} from '../../icons/SuccessToast';

import './Toast.scss';

const b = block('toast');

const FADE_IN_LAST_ANIMATION_NAME = 'move-left';
const FADE_OUT_LAST_ANIMATION_NAME = 'remove-height';

const DEFAULT_TIMEOUT = 5000;

const TITLE_ICONS = {
    error: AttentionToast,
    success: SuccessToast,
};

export interface ToastAction {
    label: string;
    onClick: VoidFunction;
    removeAfterClick?: boolean;
}

export type ToastType = 'error' | 'success';

export interface ToastProps {
    name: string;
    title?: string;
    className?: string;
    timeout?: number;
    allowAutoHiding?: boolean;
    content?: React.ReactNode;
    type?: ToastType;
    isClosable?: boolean;
    isOverride?: boolean;
    actions?: ToastAction[];
}

interface ToastInnerProps {
    removeCallback: VoidFunction;
}

interface ToastUnitedProps extends ToastProps, ToastInnerProps {}

enum ToastStatus {
    Creating = 'creating',
    ShowingIndents = 'showing-indents',
    ShowingHeight = 'showing-height',
    Hiding = 'hiding',
    Shown = 'shown',
}

interface UseCloseOnTimeoutProps {
    onClose: VoidFunction;
    timeout?: number;
}

function useCloseOnTimeout({onClose, timeout}: UseCloseOnTimeoutProps) {
    const timerId = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const setTimer = React.useCallback(() => {
        if (!timeout) {
            return;
        }

        timerId.current = setTimeout(async () => {
            onClose();
        }, timeout);
    }, [timeout, onClose]);

    const clearTimer = React.useCallback(() => {
        if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = undefined;
        }
    }, []);

    React.useEffect(() => {
        setTimer();
        return () => {
            clearTimer();
        };
    }, [setTimer, clearTimer]);

    const onMouseOver = () => {
        clearTimer();
    };

    const onMouseLeave = () => {
        setTimer();
    };

    return {onMouseOver, onMouseLeave};
}

interface UseToastHeightProps {
    isOverride: boolean;
    status: ToastStatus;
}

function useToastHeight({isOverride, status}: UseToastHeightProps) {
    const [height, setHeight] = React.useState<number | undefined>(undefined);

    const ref = React.useRef<HTMLDivElement>(null);

    const getToastHeight = React.useCallback(() => {
        return ref.current?.offsetHeight;
    }, []);

    React.useEffect(() => {
        setHeight(getToastHeight());
    }, [getToastHeight]);

    React.useEffect(() => {
        if (isOverride) {
            setHeight(getToastHeight());
        }
    });

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

    const onFadeInAnimationEnd = (e: {animationName: string}) => {
        if (e.animationName === FADE_IN_LAST_ANIMATION_NAME) {
            setStatus(ToastStatus.Shown);
        }
    };

    const onFadeOutAnimationEnd = (e: {animationName: string}) => {
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

    return actions.map(({label, onClick, removeAfterClick = true}, index) => {
        const onActionClick = () => {
            onClick();
            if (removeAfterClick) {
                onClose();
            }
        };

        return (
            <Link key={`${label}__${index}`} className={b('action')} onClick={onActionClick}>
                {label}
            </Link>
        );
    });
}

interface RenderIconProps {
    type?: ToastType;
}

function renderIcon({type}: RenderIconProps) {
    const icon = type ? TITLE_ICONS[type] : null;

    if (!icon) {
        return null;
    }

    return <Icon data={icon} className={b('icon', {title: true})} />;
}

export function Toast(props: ToastUnitedProps) {
    const {allowAutoHiding = true, isClosable = true, isOverride = false} = props;

    const {
        status,
        containerProps: statusProps,
        handleClose,
    } = useToastStatus({onRemove: props.removeCallback});

    const heightProps = useToastHeight({isOverride, status});

    const timeout = allowAutoHiding ? props.timeout || DEFAULT_TIMEOUT : undefined;
    const closeOnTimeoutProps = useCloseOnTimeout({onClose: handleClose, timeout});

    const mods = {
        appearing: status === ToastStatus.ShowingIndents || status === ToastStatus.ShowingHeight,
        'show-animation': status === ToastStatus.ShowingHeight,
        'hide-animation': status === ToastStatus.Hiding,
        created: status !== ToastStatus.Creating,
    };

    const {content, actions, title, className, type} = props;
    return (
        <div
            className={b(mods, className)}
            {...statusProps}
            {...heightProps}
            {...closeOnTimeoutProps}
        >
            <div className={b('title', {bold: Boolean(content || actions)})}>
                {renderIcon({type})}
                {title}
            </div>
            {isClosable && (
                <Button
                    view="flat-secondary"
                    size="s"
                    style={{position: 'absolute', top: 10, right: 10}}
                    onClick={handleClose}
                >
                    <Icon data={CrossIcon} />
                </Button>
            )}
            {content}
            {renderActions({actions, onClose: handleClose})}
        </div>
    );
}
