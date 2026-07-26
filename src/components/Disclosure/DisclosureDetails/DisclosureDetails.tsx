'use client';

import * as React from 'react';

import {Transition} from 'react-transition-group';

import {useMatchMedia} from '../../../hooks/private/useMatchMedia';
import type {QAProps} from '../../types';
import {useDisclosureAttributes} from '../DisclosureContext';
import {DisclosureQa, b} from '../constants';

export interface DisclosureDetailsProps extends QAProps {
    children: React.ReactNode;
    className?: string;
}

export function DisclosureDetails({children, qa, className}: DisclosureDetailsProps) {
    const {ariaControls, ariaLabelledby, keepMounted, expanded} = useDisclosureAttributes();
    const rootRef = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useMatchMedia({media: '(prefers-reduced-motion: reduce)'});

    const setHeight = (height: number | null) => {
        if (rootRef.current) {
            rootRef.current.style.height = height === null ? '' : `${height}px`;
        }
    };

    const getContentHeight = () => innerRef.current?.offsetHeight || 0;
    const setMeasuredHeight = () => {
        setHeight(getContentHeight());
    };
    const startCollapse = () => {
        rootRef.current?.getBoundingClientRect();
        setHeight(0);
    };
    const finishTransition = () => {
        setHeight(null);
    };

    return (
        <Transition
            key={keepMounted ? 'persistent' : 'temporary'}
            nodeRef={rootRef}
            in={expanded}
            addEndListener={(done) => waitForTransition(rootRef.current, done)}
            enter={!prefersReducedMotion}
            exit={!prefersReducedMotion}
            mountOnEnter={!keepMounted}
            unmountOnExit={!keepMounted}
            onEnter={() => setHeight(0)}
            onEntering={setMeasuredHeight}
            onEntered={finishTransition}
            onExit={setMeasuredHeight}
            onExiting={startCollapse}
            onExited={finishTransition}
        >
            {(transitionState) => {
                const visible = transitionState === 'entering' || transitionState === 'entered';
                const transitioning =
                    transitionState === 'entering' || transitionState === 'exiting';
                const hiddenAttributes = expanded ? {} : {inert: ''};

                return (
                    <div
                        ref={rootRef}
                        {...hiddenAttributes}
                        aria-hidden={expanded ? undefined : true}
                        id={ariaControls}
                        role="region"
                        aria-labelledby={ariaLabelledby}
                        className={b('content', {visible, transitioning}, className)}
                        data-qa={qa || DisclosureQa.DETAILS}
                    >
                        <div ref={innerRef} className={b('content-wrapper')}>
                            <div className={b('content-inner')}>{children}</div>
                        </div>
                    </div>
                );
            }}
        </Transition>
    );
}

function waitForTransition(element: HTMLElement | null, done: () => void) {
    if (!element || !hasTransition(element)) {
        window.setTimeout(done, 0);
        return;
    }

    const handleTransitionComplete = (event: TransitionEvent) => {
        if (event.target !== element) {
            return;
        }
        if (event.type === 'transitioncancel' && hasTransition(element)) {
            return;
        }

        element.removeEventListener('transitionend', handleTransitionComplete);
        element.removeEventListener('transitioncancel', handleTransitionComplete);
        done();
    };

    element.addEventListener('transitionend', handleTransitionComplete);
    element.addEventListener('transitioncancel', handleTransitionComplete);
}

function hasTransition(element: HTMLElement) {
    const style = window.getComputedStyle(element);

    return (
        style.transitionProperty !== 'none' &&
        style.transitionDuration.split(',').some((duration) => Number.parseFloat(duration) > 0)
    );
}

DisclosureDetails.displayName = 'DisclosureDetails';
