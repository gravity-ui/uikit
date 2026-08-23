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
    const containerRef = React.useRef<HTMLDivElement>(null);
    const innerRef = React.useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useMatchMedia({media: '(prefers-reduced-motion: reduce)'});

    const setHeight = (height: number | null) => {
        if (containerRef.current) {
            containerRef.current.style.height = height === null ? '' : `${height}px`;
        }
    };

    const setMeasuredHeight = () => {
        setHeight(innerRef.current?.offsetHeight ?? 0);
    };
    const startCollapse = () => {
        containerRef.current?.getBoundingClientRect();
        setHeight(0);
    };
    const finishTransition = () => {
        setHeight(null);
    };

    return (
        <Transition
            nodeRef={containerRef}
            in={expanded}
            addEndListener={(done) => waitForTransition(containerRef.current, done)}
            enter={!prefersReducedMotion}
            exit={!prefersReducedMotion}
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
                const shouldRenderContent = keepMounted || transitionState !== 'exited';
                const hiddenAttributes = expanded ? {} : {inert: ''};

                return (
                    <div
                        ref={containerRef}
                        className={b('content-container', {visible, transitioning})}
                    >
                        {shouldRenderContent && (
                            <div ref={innerRef} className={b('content-wrapper')}>
                                <div
                                    {...hiddenAttributes}
                                    aria-hidden={expanded ? undefined : true}
                                    id={ariaControls}
                                    role="region"
                                    aria-labelledby={ariaLabelledby}
                                    className={b('content', {visible, transitioning}, className)}
                                    data-qa={qa || DisclosureQa.DETAILS}
                                >
                                    {children}
                                </div>
                            </div>
                        )}
                    </div>
                );
            }}
        </Transition>
    );
}

function waitForTransition(element: HTMLElement | null, done: () => void) {
    if (!element || typeof element.getAnimations !== 'function') {
        window.setTimeout(done, 0);
        return;
    }

    const transitions = element
        .getAnimations()
        .filter(
            (animation) =>
                animation.playState !== 'finished' &&
                animation.playState !== 'idle' &&
                'transitionProperty' in animation &&
                (animation.transitionProperty === 'height' ||
                    animation.transitionProperty === 'opacity'),
        );

    if (transitions.length === 0) {
        window.setTimeout(done, 0);
        return;
    }

    Promise.allSettled(transitions.map((transition) => transition.finished)).then(() => done());
}

DisclosureDetails.displayName = 'DisclosureDetails';
