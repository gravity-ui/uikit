'use client';

import * as React from 'react';

import {
    FloatingFocusManager,
    arrow,
    autoUpdate,
    offset as floatingOffset,
    limitShift,
    shift,
    useDismiss,
    useFloating,
    useInteractions,
    useRole,
    useTransitionStatus,
} from '@floating-ui/react';
import type {
    ElementProps,
    FloatingFocusManagerProps,
    FloatingRootContext,
    Middleware,
    OpenChangeReason,
    ReferenceType,
    Strategy,
    UseFloatingOptions,
    UseRoleProps,
} from '@floating-ui/react';

import {useForkRef} from '../../hooks';
import {usePrevious} from '../../hooks/private';
import {Portal} from '../Portal';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';

import {PopupArrow} from './PopupArrow';
import {OVERFLOW_PADDING, TRANSITION_DURATION} from './constants';
import i18n from './i18n';
import type {PopupAnchorElement, PopupAnchorRef, PopupOffset, PopupPlacement} from './types';
import {arrowStylesMiddleware, getOffsetOptions, getPlacementOptions} from './utils';

import './Popup.scss';

export type PopupCloseReason = 'outsideClick' | 'escapeKeyDown';

export interface PopupProps extends DOMProps, AriaLabelingProps, QAProps {
    children?: React.ReactNode;
    /** Manages `Popup` visibility */
    open?: boolean;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    /** `Popup` will not be removed from the DOM upon hiding */
    keepMounted?: boolean;
    /** Render an arrow pointing to the anchor */
    hasArrow?: boolean;
    /** Floating UI strategy */
    strategy?: Strategy;
    /** floating element placement */
    placement?: PopupPlacement;
    /** floating element offset relative to anchor */
    offset?: PopupOffset;
    /** floating element anchor */
    anchorElement?: PopupAnchorElement | null;
    /**
     * floating element anchor ref object
     *
     * @deprecated Use `anchorElement` instead
     * */
    anchorRef?: PopupAnchorRef;
    /** Floating UI middlewares. If set, they will completely overwrite the default middlewares. */
    floatingMiddlewares?: Middleware[];
    /** Floating UI context to provide interactions */
    floatingContext?: FloatingRootContext<ReferenceType>;
    /** Additional floating element props to provide interactions */
    floatingInteractions?: ElementProps[];
    /** React ref floating element is attached to */
    floatingRef?: React.Ref<HTMLDivElement>;
    /** Manage focus when opened */
    autoFocus?: boolean;
    /** If true focus is trapped inside the floating element */
    modalFocus?: boolean;
    /** The initial element to be focused */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /** Element which focus should be returned to */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];
    /** Do not add a11y dismiss buttons when managing focus */
    disableFocusVisuallyHiddenDismiss?: boolean;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     *
     * @deprecated Use `onOpenChange` instead
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: PopupCloseReason) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     *
     * @deprecated Use `onOpenChange` instead
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
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
    /** Do not use `Portal` for children */
    disablePortal?: boolean;
    /** ARIA role or special component role (select, combobox) */
    role?: UseRoleProps['role'];
    /** HTML `id` attribute */
    id?: string;
    /** CSS property `z-index` */
    zIndex?: number;
    /** Callback called when `Popup` is opened and "in" transition is started */
    onTransitionIn?: () => void;
    /** Callback called when `Popup` is opened and "in" transition is completed */
    onTransitionInComplete?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is started */
    onTransitionOut?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is completed */
    onTransitionOutComplete?: () => void;
}

const b = block('popup');

export function Popup({
    keepMounted = false,
    hasArrow = false,
    open = false,
    onOpenChange,
    strategy,
    placement: placementProp,
    offset: offsetProp = 4,
    anchorElement,
    anchorRef,
    floatingMiddlewares,
    floatingContext,
    floatingInteractions,
    floatingRef,
    modalFocus = false,
    autoFocus = false,
    initialFocus,
    returnFocus = true,
    disableFocusVisuallyHiddenDismiss = false,
    onClose,
    onEscapeKeyDown,
    onOutsideClick,
    disableEscapeKeyDown = false,
    disableOutsideClick = false,
    style,
    className,
    children,
    disablePortal = false,
    qa,
    role: roleProp,
    zIndex = 1000,
    onTransitionIn,
    onTransitionOut,
    onTransitionInComplete,
    onTransitionOutComplete,
    ...restProps
}: PopupProps) {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

    const {offset} = getOffsetOptions(offsetProp, hasArrow);
    const {placement, middleware: placementMiddleware} = getPlacementOptions(
        placementProp,
        disablePortal,
    );

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
        [onOpenChange, onClose, onEscapeKeyDown, onOutsideClick],
    );

    const {
        refs,
        elements,
        floatingStyles,
        placement: finalPlacement,
        middlewareData,
        context,
        update,
    } = useFloating({
        rootContext: floatingContext,
        strategy,
        placement: placement,
        open,
        onOpenChange: handleOpenChange,
        middleware: floatingMiddlewares ?? [
            floatingOffset(offset),
            placementMiddleware,
            shift({
                padding: OVERFLOW_PADDING,
                // Offset 22 is size of the arrow (18) + padding (4)
                limiter: limitShift({offset: 4 + (hasArrow ? 18 : 0)}),
                altBoundary: disablePortal,
            }),
            hasArrow && arrow({element: arrowElement, padding: 4}),
            hasArrow && arrowStylesMiddleware(),
        ],
    });

    React.useEffect(() => {
        const element = anchorElement === undefined ? anchorRef?.current : anchorElement;
        if (element !== undefined && element !== refs.reference.current) {
            refs.setReference(element);
        }
    }, [anchorElement, anchorRef, refs]);

    const role = useRole(context, {
        enabled: Boolean(roleProp || modalFocus),
        role: roleProp ?? (modalFocus ? 'dialog' : undefined),
    });
    const dismiss = useDismiss(context, {
        enabled: !disableOutsideClick || !disableEscapeKeyDown,
        outsidePress: !disableOutsideClick,
        escapeKey: !disableEscapeKeyDown,
    });

    const {getFloatingProps} = useInteractions(floatingInteractions ?? [role, dismiss]);

    const {isMounted, status} = useTransitionStatus(context, {duration: TRANSITION_DURATION});
    const previousStatus = usePrevious(status);

    React.useEffect(() => {
        if (isMounted && elements.reference && elements.floating) {
            return autoUpdate(elements.reference, elements.floating, update);
        }
        return undefined;
    }, [isMounted, elements, update]);

    const initialFocusRef = React.useRef<HTMLDivElement>(null);
    const handleFloatingRef = useForkRef<HTMLDivElement>(
        refs.setFloating,
        floatingRef,
        initialFocusRef,
    );

    const handleTransitionEnd = React.useCallback(
        (event: React.TransitionEvent) => {
            // There are two simultaneous transitions running at the same time
            // Use specific name to only notify once
            if (status === 'open' && event.propertyName === 'transform') {
                onTransitionInComplete?.();
            }
        },
        [status, onTransitionInComplete],
    );

    // Cannot use transitionend event for these callbacks due to unmounting from the DOM
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
    }, [status, previousStatus, onTransitionIn, onTransitionOut, onTransitionOutComplete]);

    return isMounted || keepMounted ? (
        <Portal disablePortal={disablePortal}>
            <FloatingFocusManager
                context={context}
                disabled={!autoFocus || !isMounted}
                modal={modalFocus && isMounted}
                initialFocus={initialFocus ?? initialFocusRef}
                returnFocus={returnFocus}
                visuallyHiddenDismiss={disableFocusVisuallyHiddenDismiss ? false : i18n('close')}
                guards={modalFocus || !disablePortal}
            >
                <div
                    ref={handleFloatingRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex,
                        width: 'max-content',
                        pointerEvents: isMounted ? 'auto' : 'none',
                        outline: 'none',
                        ...floatingStyles,
                    }}
                    data-floating-ui-placement={finalPlacement}
                    data-floating-ui-status={status}
                    aria-modal={modalFocus && isMounted ? true : undefined}
                    {...getFloatingProps({
                        onTransitionEnd: handleTransitionEnd,
                    })}
                >
                    <div
                        ref={contentRef}
                        className={b({open: isMounted}, className)}
                        style={style}
                        data-qa={qa}
                        {...filterDOMProps(restProps)}
                    >
                        {hasArrow && (
                            <PopupArrow ref={setArrowElement} styles={middlewareData.arrowStyles} />
                        )}
                        {children}
                    </div>
                </div>
            </FloatingFocusManager>
        </Portal>
    ) : null;
}
