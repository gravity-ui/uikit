'use client';

import * as React from 'react';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {block} from '../../utils/cn';
import {getCSSTransitionClassNames} from '../../utils/transition';
import {Toast} from '../Toast/Toast';
import type {InternalToastProps, ToastListProps} from '../types';

import './ToastAnimation.scss';
import './ToastList.scss';

export function ToastList(props: ToastListProps) {
    const {toasts, mobile, alternateAnimationFunction, removeCallback} = props;

    const classNames = React.useMemo(
        () =>
            mobile
                ? getCSSTransitionClassNames(block('toast-animation-mobile'), {
                      feature: alternateAnimationFunction ? 'alternate-animation-timing-fn' : false,
                  })
                : getCSSTransitionClassNames(block('toast-animation-desktop'), {
                      feature: alternateAnimationFunction ? 'alternate-animation-timing-fn' : false,
                  }),
        [alternateAnimationFunction, mobile],
    );

    return (
        <TransitionGroup component={null}>
            {toasts.map((toast) => (
                <CSSTransition
                    key={`${toast.name}_${toast.addedAt}`}
                    nodeRef={toast.ref}
                    classNames={classNames}
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
