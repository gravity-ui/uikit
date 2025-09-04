'use client';

import * as React from 'react';

import {
    FloatingFocusManager,
    FloatingNode,
    FloatingTree,
    arrow,
    autoUpdate,
    offset as floatingOffset,
    limitShift,
    shift,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useInteractions,
    useRole,
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
import {useFloatingTransition} from '../../hooks/private/useFloatingTransition';
import {Portal} from '../Portal';
import type {PortalProps} from '../Portal';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';
import {useLayer} from '../utils/layer-manager';

import {PopupArrow} from './PopupArrow';
import {OVERFLOW_PADDING, TRANSITION_DURATION} from './constants';
import i18n from './i18n';
import type {PopupAnchorElement, PopupAnchorRef, PopupOffset, PopupPlacement} from './types';
import {arrowStylesMiddleware, getOffsetOptions, getPlacementOptions} from './utils';

import './Popup.scss';

export type PopupCloseReason = 'outsideClick' | 'escapeKeyDown' | string | undefined;

export interface PopupProps
    extends Pick<PortalProps, 'container' | 'disablePortal'>,
        DOMProps,
        AriaLabelingProps,
        QAProps {
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
     * @deprecated Use `anchorElement` instead
     */
    anchorRef?: PopupAnchorRef;
    /** Floating UI middlewares. If set, they will completely overwrite the default middlewares. */
    floatingMiddlewares?: Middleware[];
    /** Floating UI context to provide interactions */
    floatingContext?: FloatingRootContext<ReferenceType>;
    /** Additional floating element props to provide interactions */
    floatingInteractions?: ElementProps[];
    /** React ref floating element is attached to */
    floatingRef?: React.Ref<HTMLDivElement>;
    /** Styles to apply to the `Floating UI` element */
    floatingStyles?: React.CSSProperties;
    /** Additional class to apply to the `Floating UI` element */
    floatingClassName?: string;
    /** If true `Popup` act like a modal dialog */
    modal?: boolean;
    /** The initial element to be focused */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /** Element which focus should be returned to */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];
    /** The order in which focus circle */
    focusOrder?: FloatingFocusManagerProps['order'];
    /** Do not add a11y dismiss buttons when managing focus in modal */
    disableVisuallyHiddenDismiss?: boolean;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     * @deprecated Use `onOpenChange` instead
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: PopupCloseReason) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     * @deprecated Use `onOpenChange` instead
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
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
    /** Do not dismiss on focusout */
    disableFocusOut?: boolean;
    /**
     * Do not use as layer
     */
    disableLayer?: boolean;
    /** Disables animation of popup appearing/disappearing */
    disableTransition?: boolean;
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

function PopupComponent({
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
    floatingStyles: floatingStylesProp,
    floatingClassName,
    modal = false,
    initialFocus: initialFocusProp,
    returnFocus = true,
    focusOrder,
    disableVisuallyHiddenDismiss = !modal,
    onClose,
    onEscapeKeyDown,
    onOutsideClick,
    disableEscapeKeyDown = false,
    disableOutsideClick = false,
    disableFocusOut = false,
    style,
    className,
    children,
    container,
    disablePortal = false,
    disableLayer = false,
    disableTransition = false,
    qa,
    role: roleProp,
    zIndex = 1000,
    onTransitionIn,
    onTransitionOut,
    onTransitionInComplete,
    onTransitionOutComplete,
    ...restProps
}: PopupProps) {
    useLayer({open, type: 'popup', enabled: !disableLayer});

    const contentRef = React.useRef<HTMLDivElement>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

    const {offset} = getOffsetOptions(offsetProp, hasArrow);
    const {placement, middleware: placementMiddleware} = getPlacementOptions(
        placementProp,
        disablePortal,
    );

    const {t} = i18n.useTranslation();

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
        [onOpenChange, onClose, onEscapeKeyDown, onOutsideClick],
    );

    const floatingNodeId = useFloatingNodeId();

    const {
        refs,
        elements,
        floatingStyles,
        placement: finalPlacement,
        middlewareData,
        context,
        update,
        isPositioned,
    } = useFloating({
        rootContext: floatingContext,
        nodeId: floatingNodeId,
        strategy,
        placement: placement,
        open,
        onOpenChange: handleOpenChange,
        middleware: floatingMiddlewares ?? [
            floatingOffset(offset),
            shift({
                padding: OVERFLOW_PADDING,
                // Offset 22 is size of the arrow (18) + padding (4)
                limiter: limitShift({offset: 4 + (hasArrow ? 18 : 0)}),
                altBoundary: disablePortal,
            }),
            placementMiddleware,
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
        enabled: Boolean(roleProp || modal),
        role: roleProp ?? (modal ? 'dialog' : undefined),
    });
    const dismiss = useDismiss(context, {
        enabled: !disableOutsideClick || !disableEscapeKeyDown,
        outsidePress: !disableOutsideClick,
        escapeKey: !disableEscapeKeyDown,
    });

    const {getFloatingProps} = useInteractions(floatingInteractions ?? [role, dismiss]);

    const {isMounted, status} = useFloatingTransition({
        context,
        duration: disableTransition ? 0 : TRANSITION_DURATION,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
    });

    React.useEffect(() => {
        if (isMounted && elements.reference && elements.floating) {
            return autoUpdate(elements.reference, elements.floating, update);
        }
        return undefined;
    }, [isMounted, elements, update]);

    const handleFloatingRef = useForkRef<HTMLDivElement>(refs.setFloating, floatingRef);

    let initialFocus = initialFocusProp;
    if (typeof initialFocus === 'undefined') {
        if (modal) {
            initialFocus = refs.floating;
        } else {
            initialFocus = -1;
        }
    }

    return (
        <FloatingNode id={floatingNodeId}>
            {isMounted || keepMounted ? (
                <Portal container={container} disablePortal={disablePortal}>
                    <FloatingFocusManager
                        context={context}
                        disabled={!isPositioned}
                        modal={modal}
                        initialFocus={initialFocus}
                        returnFocus={returnFocus}
                        closeOnFocusOut={!disableFocusOut}
                        visuallyHiddenDismiss={disableVisuallyHiddenDismiss ? false : t('close')}
                        guards={modal || !disablePortal}
                        order={focusOrder}
                    >
                        <div
                            ref={handleFloatingRef}
                            className={floatingClassName}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex,
                                width: 'max-content',
                                pointerEvents: isMounted ? 'auto' : 'none',
                                outline: 'none',
                                ...floatingStyles,
                                ...floatingStylesProp,
                            }}
                            data-floating-ui-placement={finalPlacement}
                            data-floating-ui-status={status}
                            aria-modal={modal && isMounted ? true : undefined}
                            {...getFloatingProps()}
                        >
                            <div
                                ref={contentRef}
                                className={b(
                                    {
                                        open: isMounted,
                                        'disable-transition': disableTransition,
                                    },
                                    className,
                                )}
                                style={style}
                                data-qa={qa}
                                {...filterDOMProps(restProps)}
                            >
                                {hasArrow && (
                                    <PopupArrow
                                        ref={setArrowElement}
                                        styles={middlewareData.arrowStyles}
                                    />
                                )}
                                {children}
                            </div>
                        </div>
                    </FloatingFocusManager>
                </Portal>
            ) : null}
        </FloatingNode>
    );
}

export function Popup(props: PopupProps) {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
        return (
            <FloatingTree>
                <PopupComponent {...props} />
            </FloatingTree>
        );
    }

    return <PopupComponent {...props} />;
}
