'use client';

import * as React from 'react';

import {
    FloatingFocusManager,
    FloatingNode,
    FloatingOverlay,
    FloatingTree,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type {
    FloatingFocusManagerProps,
    OpenChangeReason,
    UseFloatingOptions,
} from '@floating-ui/react';
import {isTabbable} from 'tabbable';

import {KeyCode} from '../../constants';
import {useForkRef} from '../../hooks';
import {useAnimateHeight} from '../../hooks/private';
import {useFloatingTransition} from '../../hooks/private/useFloatingTransition';
import {Portal} from '../Portal';
import type {PortalProps} from '../Portal';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';
import {useLayer} from '../utils/layer-manager';

import i18n from './i18n';

import './Modal.scss';

export type ModalCloseReason = 'outsideClick' | 'escapeKeyDown' | string | undefined;

export interface ModalProps
    extends Pick<PortalProps, 'container' | 'disablePortal'>,
        DOMProps,
        AriaLabelingProps,
        QAProps {
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
    disableVisuallyHiddenDismiss?: boolean;

    children?: React.ReactNode;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     * @deprecated Use `onOpenChange` instead
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: ModalCloseReason) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     * @deprecated Use `onOpenChange` instead
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when Enter key is pressed on keyboard
     * @deprecated It is not recommended to use this callback.
     * Consider using the submit event in case of a form content or using initialFocus property on the confirm button in case of non-interactive content
     */
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when click is outside of elements of "top layer"
     * This behaviour could be disabled with `disableOutsideClick` option
     * @deprecated Use `onOpenChange` instead
     */
    onOutsideClick?: (event: MouseEvent) => void;
    /** Do not dismiss on escape key press */
    disableEscapeKeyDown?: boolean;
    /** Do not dismiss on outside click */
    disableOutsideClick?: boolean;
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
    disableHeightTransition?: boolean;
}

const b = block('modal');

const TRANSITION_DURATION = 150;

function ModalComponent({
    open = false,
    onOpenChange,
    keepMounted = false,
    disableBodyScrollLock = false,
    disableEscapeKeyDown,
    disableOutsideClick,
    initialFocus,
    returnFocus,
    disableVisuallyHiddenDismiss,
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
    disablePortal,
    qa,
    floatingRef,
    disableHeightTransition = false,
    ...restProps
}: ModalProps) {
    useLayer({open, type: 'modal'});

    const overlayRef = React.useRef<HTMLDivElement>(null);

    const handleOpenChange = React.useCallback<NonNullable<UseFloatingOptions['onOpenChange']>>(
        (isOpen, event, reason) => {
            onOpenChange?.(isOpen, event, reason);

            if (isOpen || !event) {
                return;
            }

            let closeReason;
            if (reason === 'escape-key') {
                closeReason = 'escapeKeyDown';
            } else if (reason === 'outside-press') {
                closeReason = 'outsideClick';
            } else {
                closeReason = reason;
            }

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

    const floatingNodeId = useFloatingNodeId();

    const {refs, elements, context} = useFloating({
        nodeId: floatingNodeId,
        open,
        onOpenChange: handleOpenChange,
    });

    const handleFloatingRef = useForkRef<HTMLDivElement>(refs.setFloating, floatingRef);

    const dismiss = useDismiss(context, {
        enabled: !disableOutsideClick || !disableEscapeKeyDown,
        outsidePress: (event) => {
            if (disableOutsideClick) {
                return false;
            }

            // Prevent closing parent modals if they aren't nested in the React tree
            if ((event.target as HTMLElement).closest(`.${b()}`) !== overlayRef.current) {
                return false;
            }

            return true;
        },
        escapeKey: !disableEscapeKeyDown,
    });

    const role = useRole(context, {role: 'dialog'});

    const {getFloatingProps} = useInteractions([dismiss, role]);

    const {isMounted, status} = useFloatingTransition({
        context,
        duration: TRANSITION_DURATION,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
    });

    useAnimateHeight({
        ref: refs.floating,
        enabled: status === 'open' && !disableHeightTransition,
    });

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

    const {t} = i18n.useTranslation();

    return (
        <FloatingNode id={floatingNodeId}>
            {isMounted || keepMounted ? (
                <Portal container={container} disablePortal={disablePortal}>
                    <FloatingOverlay
                        ref={overlayRef}
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
                                    initialFocus={initialFocus ?? refs.floating}
                                    returnFocus={returnFocus}
                                    visuallyHiddenDismiss={
                                        disableVisuallyHiddenDismiss ? false : t('close')
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
            ) : null}
        </FloatingNode>
    );
}

export function Modal(props: ModalProps) {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
        return (
            <FloatingTree>
                <ModalComponent {...props} />
            </FloatingTree>
        );
    }

    return <ModalComponent {...props} />;
}
