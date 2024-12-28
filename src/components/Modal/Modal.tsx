'use client';

import * as React from 'react';

import {
    FloatingFocusManager,
    FloatingOverlay,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStatus,
} from '@floating-ui/react';
import type {
    FloatingFocusManagerProps,
    OpenChangeReason,
    UseFloatingOptions,
} from '@floating-ui/react';
import {isTabbable} from 'tabbable';

import {KeyCode} from '../../constants';
import {useForkRef} from '../../hooks';
import {usePrevious} from '../../hooks/private';
import {Portal} from '../Portal';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import i18n from './i18n';

import './Modal.scss';

export type ModalCloseReason = 'outsideClick' | 'escapeKeyDown';

export interface ModalProps extends DOMProps, AriaLabelingProps, QAProps {
    open?: boolean;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    keepMounted?: boolean;
    disableBodyScrollLock?: boolean;
    /**
     * FloatingFocusManager `initialFocus` property
     */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /**
     * FloatingFocusManager `returnFocus` property
     */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];

    /** Do not add a11y dismiss buttons when managing focus */
    disableFocusVisuallyHiddenDismiss?: boolean;

    children?: React.ReactNode;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     *
     * @deprecated Use `onOpenChange` instead
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: ModalCloseReason) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     *
     * @deprecated Use `onOpenChange` instead
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when Enter key is pressed on keyboard
     *
     * @deprecated It is not recommended to use this callback.
     * Consider using the submit event in case of a form content or using initialFocus property on the confirm button in case of non-interactive content
     */
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when click is outside of elements of "top layer"
     * This behaviour could be disabled with `disableOutsideClick` option
     *
     * @deprecated Use `onOpenChange` instead
     */
    onOutsideClick?: (event: MouseEvent) => void;
    /** Do not dismiss on escape key press */
    disableEscapeKeyDown?: boolean;
    /** Do not dismiss on outside click */
    disableOutsideClick?: boolean;
    container?: HTMLElement;
    contentClassName?: string;
    /** Callback called when `Modal` is opened and "in" transition is started */
    onTransitionIn?: () => void;
    /** Callback called when `Modal` is opened and "in" transition is completed */
    onTransitionInComplete?: () => void;
    /** Callback called when `Modal` is closed and "out" transition is started */
    onTransitionOut?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is completed */
    onTransitionOutComplete?: () => void;
    contentOverflow?: 'visible' | 'auto';

    floatingRef?: React.RefObject<HTMLDivElement>;
}

const b = block('modal');

const TRANSITION_DURATION = 150;

export function Modal({
    open = false,
    onOpenChange,
    keepMounted = false,
    disableBodyScrollLock = false,
    disableEscapeKeyDown,
    disableOutsideClick,
    initialFocus,
    returnFocus,
    disableFocusVisuallyHiddenDismiss,
    onEscapeKeyDown,
    onOutsideClick,
    onClose,
    onEnterKeyDown,
    onTransitionIn,
    onTransitionInComplete,
    onTransitionOut,
    onTransitionOutComplete,
    children,
    style,
    contentOverflow = 'visible',
    className,
    contentClassName,
    container,
    qa,
    floatingRef,
    ...restProps
}: ModalProps) {
    const handleOpenChange = React.useCallback<NonNullable<UseFloatingOptions['onOpenChange']>>(
        (isOpen, event, reason) => {
            onOpenChange?.(isOpen, event, reason);

            if (isOpen || !event) {
                return;
            }

            const closeReason = reason === 'escape-key' ? 'escapeKeyDown' : 'outsideClick';

            if (closeReason === 'escapeKeyDown' && onEscapeKeyDown) {
                onEscapeKeyDown(event as KeyboardEvent);
            }

            if (closeReason === 'outsideClick' && onOutsideClick) {
                onOutsideClick(event as MouseEvent);
            }

            onClose?.(event as KeyboardEvent | MouseEvent, closeReason);
        },
        [onOpenChange, onEscapeKeyDown, onOutsideClick, onClose],
    );

    const {refs, elements, context} = useFloating({
        open,
        onOpenChange: handleOpenChange,
    });

    const initialFocusRef = React.useRef<HTMLDivElement>(null);
    const handleFloatingRef = useForkRef<HTMLDivElement>(
        refs.setFloating,
        initialFocusRef,
        floatingRef,
    );

    const dismiss = useDismiss(context, {
        enabled: !disableOutsideClick || !disableEscapeKeyDown,
        outsidePress: !disableOutsideClick,
        escapeKey: !disableEscapeKeyDown,
    });

    const role = useRole(context, {role: 'dialog'});

    const {getFloatingProps} = useInteractions([dismiss, role]);

    const {isMounted, status} = useTransitionStatus(context, {duration: TRANSITION_DURATION});
    const previousStatus = usePrevious(status);

    React.useEffect(() => {
        if (status === 'initial' && previousStatus === 'unmounted') {
            onTransitionIn?.();
        }
        if (status === 'close' && previousStatus === 'open') {
            onTransitionOut?.();
        }
        if (status === 'unmounted' && previousStatus === 'close') {
            onTransitionOutComplete?.();
        }
    }, [previousStatus, status, onTransitionIn, onTransitionOut, onTransitionOutComplete]);

    const handleTransitionEnd = React.useCallback(
        (event: React.TransitionEvent) => {
            // There are two simultaneous transitions running at the same time
            // Use specific name to only notify once
            if (
                status === 'open' &&
                event.propertyName === 'transform' &&
                event.target === elements.floating
            ) {
                onTransitionInComplete?.();
            }
        },
        [status, onTransitionInComplete, elements.floating],
    );

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent) => {
            if (!onEnterKeyDown || event.key !== KeyCode.ENTER || event.defaultPrevented) {
                return;
            }

            const floatingElement = elements.floating;
            if (!floatingElement) {
                return;
            }
            const pathElements = event.nativeEvent.composedPath();
            const index = pathElements.indexOf(floatingElement);

            const nestedElements = index < 0 ? pathElements : pathElements.slice(0, index);
            const nestedFloatingElementIndex = nestedElements.findIndex((el) =>
                (el as Element)?.hasAttribute('data-floating-ui-focusable'),
            );

            if (nestedFloatingElementIndex < 0) {
                onEnterKeyDown(event.nativeEvent);
                return;
            }

            const hasInnerTabbableElements = nestedElements
                .slice(0, nestedFloatingElementIndex)
                .some((el) => isTabbable(el as Element));

            if (!hasInnerTabbableElements) {
                onEnterKeyDown(event.nativeEvent);
            }
        },
        [elements.floating, onEnterKeyDown],
    );

    return isMounted || keepMounted ? (
        <Portal container={container}>
            <FloatingOverlay
                style={style}
                className={b({open}, className)}
                data-qa={qa}
                data-floating-ui-status={status}
                lockScroll={!disableBodyScrollLock}
            >
                <div className={b('content-aligner')}>
                    <div className={b('content-wrapper')}>
                        <FloatingFocusManager
                            context={context}
                            disabled={!isMounted}
                            modal={isMounted}
                            initialFocus={initialFocus ?? initialFocusRef}
                            returnFocus={returnFocus}
                            visuallyHiddenDismiss={
                                disableFocusVisuallyHiddenDismiss ? false : i18n('close')
                            }
                            restoreFocus={true}
                        >
                            <div
                                {...filterDOMProps(restProps, {labelable: true})}
                                className={b(
                                    'content',
                                    {'has-scroll': contentOverflow === 'auto'},
                                    contentClassName,
                                )}
                                ref={handleFloatingRef}
                                {...getFloatingProps({
                                    onTransitionEnd: handleTransitionEnd,
                                    onKeyDown: handleKeyDown,
                                })}
                            >
                                {children}
                            </div>
                        </FloatingFocusManager>
                    </div>
                </div>
            </FloatingOverlay>
        </Portal>
    ) : null;
}
