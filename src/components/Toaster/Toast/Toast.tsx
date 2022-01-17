import React, {ReactNode, useMemo, useEffect, useRef, useState} from 'react';
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

export interface ToastGeneralProps {
    name: string;
    title?: string;
    className?: string;
    timeout?: number;
    allowAutoHiding?: boolean;
    content?: ReactNode;
    type?: ToastType;
    isClosable?: boolean;
    isOverride?: boolean;
    actions?: ToastAction[];
}

interface ToastInnerProps {
    removeCallback: VoidFunction;
}

interface ToastProps extends ToastGeneralProps, ToastInnerProps {}

enum ToastStatus {
    creating = 'creating',
    'showing-indents' = 'showing-indents',
    'showing-height' = 'showing-height',
    'hiding' = 'hiding',
    'shown' = 'shown',
}

type ToastStyles = {
    height?: number;
    position?: 'relative';
};

export function Toast(props: ToastProps) {
    const [status, setStatus] = useState<ToastStatus>(ToastStatus.creating);
    const [height, setHeight] = useState<number | undefined>(undefined);
    const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | undefined>(undefined);

    const {allowAutoHiding = true, isClosable = true, isOverride = false} = props;

    const ref = useRef<HTMLDivElement>(null);

    const timeout = useMemo(() => {
        const {timeout} = props;

        if (!allowAutoHiding) {
            return undefined;
        }

        return timeout || DEFAULT_TIMEOUT;
    }, [props.timeout, allowAutoHiding]);

    useEffect(() => {
        setTimer();
        setHeight(getToastHeight());
        setStatus(ToastStatus['showing-indents']);
    }, []);

    useEffect(() => {
        if (isOverride) {
            setHeight(getToastHeight());
        }

        if (status === ToastStatus['showing-indents']) {
            // setTimeout is needed to animation properly work
            setTimeout(() => {
                setStatus(ToastStatus['showing-height']);
            }, 0);
        }
    }, [isOverride, status]);

    const remove = () => {
        setStatus(ToastStatus.hiding);
    };

    const animationEndHandler = useMemo(() => {
        if (status === ToastStatus['showing-height']) {
            return onFadeInAnimationEnd;
        }

        if (status === ToastStatus.hiding) {
            return onFadeOutAnimationEnd;
        }

        return undefined;
    }, [status]);

    const getToastHeight = () => {
        return ref.current?.offsetHeight;
    };

    const styles = useMemo(() => {
        const styles: ToastStyles = {};

        if (height && status !== ToastStatus['showing-indents'] && status !== ToastStatus.shown) {
            styles.height = height;
        }

        if (status !== 'creating') {
            styles.position = 'relative';
        }

        return styles;
    }, [height, status]);

    const mods = useMemo(() => {
        return {
            appearing:
                status === ToastStatus['showing-indents'] ||
                status === ToastStatus['showing-height'],
            'show-animation': status === ToastStatus['showing-height'],
            'hide-animation': status === ToastStatus.hiding,
        };
    }, [status]);

    const getTitleIcon = () => {
        const {type} = props;
        const icon = type ? TITLE_ICONS[type] : null;

        if (!icon) {
            return null;
        }

        return <Icon data={icon} className={b('icon', {title: true})} />;
    };

    const getCloseButton = () => {
        if (!isClosable) {
            return null;
        }

        return (
            <Button
                view="flat-secondary"
                size="s"
                style={{position: 'absolute', top: 10, right: 10}}
                onClick={remove}
            >
                <Icon data={CrossIcon} />
            </Button>
        );
    };

    const getActions = () => {
        const {actions} = props;

        if (!actions) {
            return null;
        }

        return actions.map(({label, onClick, removeAfterClick = true}, index) => {
            const onActionClick = () => {
                onClick();
                if (removeAfterClick) {
                    remove();
                }
            };

            return (
                <Link key={`${label}__${index}`} className={b('action')} onClick={onActionClick}>
                    {label}
                </Link>
            );
        });
    };

    const setTimer = () => {
        if (!timeout) {
            return;
        }

        setTimerId(
            setTimeout(async () => {
                if (ref.current) {
                    remove();
                }
            }, timeout),
        );
    };

    const clearTimer = () => {
        if (timerId) {
            clearTimeout(timerId);
            setTimerId(undefined);
        }
    };

    const onFadeInAnimationEnd = (e: {animationName: string}) => {
        if (e.animationName === FADE_IN_LAST_ANIMATION_NAME) {
            setStatus(ToastStatus.shown);
        }
    };

    const onFadeOutAnimationEnd = (e: {animationName: string}) => {
        const {removeCallback} = props;

        if (e.animationName === FADE_OUT_LAST_ANIMATION_NAME) {
            removeCallback();
        }
    };

    const onMouseOver = () => {
        if (timerId) {
            clearTimer();
        }
    };

    const onMouseLeave = () => {
        setTimer();
    };

    const {content, actions, title, className} = props;

    return (
        <div
            ref={ref}
            className={b(mods, className)}
            style={styles}
            onAnimationEnd={animationEndHandler}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
        >
            <div className={b('title', {bold: Boolean(content || actions)})}>
                {getTitleIcon()}
                {title}
            </div>
            {getCloseButton()}
            {content}
            {getActions()}
        </div>
    );
}
