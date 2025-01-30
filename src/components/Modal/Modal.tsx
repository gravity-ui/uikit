'use client';

import * as React from 'react';

import {CSSTransition} from 'react-transition-group';

import {useBodyScrollLock, useResizeObserver} from '../../hooks';
import {useRestoreFocus} from '../../hooks/private';
import {Portal} from '../Portal';
import type {DOMProps, QAProps} from '../types';
import {FocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
import type {LayerCloseReason} from '../utils/layer-manager';
import {useLayer} from '../utils/layer-manager';
import type {LayerExtendableProps} from '../utils/layer-manager/LayerManager';
import {getCSSTransitionClassNames} from '../utils/transition';

import './Modal.scss';

export interface ModalProps extends DOMProps, LayerExtendableProps, QAProps {
    open?: boolean;
    keepMounted?: boolean;
    disableBodyScrollLock?: boolean;
    /** @deprecated Use focusTrap instead */
    disableFocusTrap?: boolean;
    /** @deprecated Use autoFocus instead */
    disableAutoFocus?: boolean;
    focusTrap?: boolean;
    autoFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    children?: React.ReactNode;
    /**
     * Id of visible `<Modal/>` caption element
     */
    'aria-labelledby'?: string;
    /**
     * A11y text
     * Prefer `aria-labelledby` in case caption is visible to user
     */
    'aria-label'?: string;
    container?: HTMLElement;
    contentClassName?: string;
    onTransitionEnter?: VoidFunction;
    onTransitionEntered?: VoidFunction;
    onTransitionExit?: VoidFunction;
    onTransitionExited?: VoidFunction;
    contentOverflow?: 'visible' | 'auto';
}

export type ModalCloseReason = LayerCloseReason;

const b = block('modal');

export function Modal({
    open = false,
    keepMounted = false,
    disableBodyScrollLock = false,
    disableEscapeKeyDown,
    disableOutsideClick,
    disableFocusTrap,
    disableAutoFocus,
    focusTrap = true,
    autoFocus = true,
    restoreFocusRef,
    onEscapeKeyDown,
    onEnterKeyDown,
    onOutsideClick,
    onClose,
    onTransitionEnter,
    onTransitionEntered,
    onTransitionExit,
    onTransitionExited,
    children,
    style,
    contentOverflow = 'visible',
    className,
    contentClassName,
    'aria-labelledby': ariaLabelledBy,
    'aria-label': ariaLabel,
    container,
    qa,
}: ModalProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [inTransition, setInTransition] = React.useState(false);
    const previousHeight = React.useRef<number | null>(null);
    const isTransitioningHeight = React.useRef(false);

    const handleContentTransitionEnd = React.useCallback(
        (event: React.TransitionEvent<HTMLDivElement>) => {
            if (event.propertyName !== 'height') {
                return;
            }

            // ResizeObserver final resize event fires before this, so we have to delay with timeout
            setTimeout(() => {
                if (contentRef.current) {
                    contentRef.current.style.height = 'auto';
                    contentRef.current.style.overflowY = '';
                    isTransitioningHeight.current = false;
                }
            }, 0);
        },
        [contentRef],
    );

    const handleResize = React.useCallback(() => {
        if (!contentRef.current || isTransitioningHeight.current) {
            return;
        }

        const contentHeight = contentRef.current.clientHeight;
        if (!previousHeight.current) {
            previousHeight.current = contentHeight;
            return;
        }

        // Set previous height first for the transition to work, because it doesn't work with 'auto'
        contentRef.current.style.height = `${previousHeight.current}px`;
        // Set overflow to hidden so that scrollbar doesn't appear while transitioning
        contentRef.current.style.overflowY = 'hidden';
        isTransitioningHeight.current = true;

        requestAnimationFrame(() => {
            if (contentRef.current) {
                contentRef.current.style.height = `${contentHeight}px`;
                previousHeight.current = contentHeight;
            }
        });
    }, []);

    useResizeObserver({ref: contentRef, onResize: handleResize});

    useBodyScrollLock({enabled: !disableBodyScrollLock && (open || inTransition)});
    const containerProps = useRestoreFocus({
        enabled: open || inTransition,
        restoreFocusRef,
        focusTrapped: true,
    });

    useLayer({
        open,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onEnterKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [contentRef],
        type: 'modal',
    });

    return (
        <CSSTransition
            nodeRef={containerRef}
            in={open}
            addEndListener={(done) => containerRef.current?.addEventListener('animationend', done)}
            classNames={getCSSTransitionClassNames(b)}
            mountOnEnter={!keepMounted}
            unmountOnExit={!keepMounted}
            appear={true}
            onEnter={() => {
                setInTransition(true);
                onTransitionEnter?.();
            }}
            onExit={() => {
                setInTransition(true);
                onTransitionExit?.();
            }}
            onEntered={() => {
                setInTransition(false);
                onTransitionEntered?.();
            }}
            onExited={() => {
                setInTransition(false);
                onTransitionExited?.();
            }}
        >
            <Portal container={container}>
                <div ref={containerRef} style={style} className={b({open}, className)} data-qa={qa}>
                    <div className={b('content-aligner')}>
                        <div className={b('content-wrapper')}>
                            <FocusTrap
                                enabled={!disableFocusTrap && focusTrap && open && !inTransition}
                                autoFocus={!disableAutoFocus && autoFocus}
                            >
                                <div
                                    ref={contentRef}
                                    tabIndex={-1}
                                    role="dialog"
                                    aria-modal={open}
                                    aria-label={ariaLabel}
                                    aria-labelledby={ariaLabelledBy}
                                    className={b(
                                        'content',
                                        {'has-scroll': contentOverflow === 'auto'},
                                        contentClassName,
                                    )}
                                    onTransitionEnd={handleContentTransitionEnd}
                                    {...containerProps}
                                >
                                    {children}
                                </div>
                            </FocusTrap>
                        </div>
                    </div>
                </div>
            </Portal>
        </CSSTransition>
    );
}
