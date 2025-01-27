'use client';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {block} from '../../utils/cn';
import {getCSSTransitionClassNames} from '../../utils/transition';
import {Toast} from '../Toast/Toast';
import type {InternalToastProps} from '../types';

import './ToastAnimation.scss';
import './ToastList.scss';

const desktopTransitionClassNames = getCSSTransitionClassNames(block('toast-animation-desktop'));
const mobileTransitionClassNames = getCSSTransitionClassNames(block('toast-animation-mobile'));

type ToastListProps = {
    removeCallback: (name: string) => void;
    toasts: InternalToastProps[];
    mobile?: boolean;
};

export function ToastList(props: ToastListProps) {
    const {toasts, mobile, removeCallback} = props;

    return (
        <TransitionGroup component={null}>
            {toasts.map((toast) => (
                <CSSTransition
                    key={`${toast.name}_${toast.addedAt}`}
                    nodeRef={toast.ref}
                    classNames={mobile ? mobileTransitionClassNames : desktopTransitionClassNames}
                    addEndListener={(done) =>
                        toast.ref?.current?.addEventListener('animationend', done)
                    }
                    onEnter={() => updateToastHeightCssProperty(toast)}
                    onExit={() => updateToastHeightCssProperty(toast)}
                >
                    <Toast {...toast} mobile={mobile} removeCallback={removeCallback} />
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
}

function updateToastHeightCssProperty(toast: InternalToastProps) {
    if (toast.ref?.current) {
        toast.ref.current.style.setProperty(
            '--_--item-height',
            `${toast.ref.current.offsetHeight}px`,
        );
    }
}
