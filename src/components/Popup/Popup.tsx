'use client';

import * as React from 'react';

import {
    arrow,
    autoPlacement,
    autoUpdate,
    flip,
    offset as floatingOffset,
    limitShift,
    shift,
    useFloating,
} from '@floating-ui/react';
import type {
    Alignment,
    FloatingRootContext,
    Middleware,
    Placement,
    ReferenceType,
    Strategy,
} from '@floating-ui/react';
import {CSSTransition} from 'react-transition-group';

import {useForkRef} from '../../hooks';
import {useRestoreFocus} from '../../hooks/private';
import {Portal} from '../Portal';
import type {DOMProps, QAProps} from '../types';
import {FocusTrap, useParentFocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
import {useLayer} from '../utils/layer-manager';
import type {LayerExtendableProps} from '../utils/layer-manager/LayerManager';
import {getCSSTransitionClassNames} from '../utils/transition';

import {PopupArrow} from './PopupArrow';
import {useAnchor} from './hooks';
import type {PopupAnchorElement, PopupAnchorRef, PopupOffset, PopupPlacement} from './types';
import {getOffsetValue, isAutoPlacement} from './utils';

import './Popup.scss';

export interface PopupProps extends DOMProps, LayerExtendableProps, QAProps {
    children?: React.ReactNode;
    /** Manages `Popup` visibility */
    open?: boolean;
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
    /** floating element anchor ref object */
    anchorRef?: PopupAnchorRef;
    /** Floating UI middlewares. If set, they will completely overwrite the default middlewares. */
    middlewares?: Middleware[];
    /** Floating UI context to provide interactions */
    floatingContext?: FloatingRootContext<ReferenceType>;
    /** Additional floating element props to provide interactions */
    floatingProps?: Record<string, unknown>;
    /** React ref floating element is attached to */
    floatingRef?: React.Ref<HTMLDivElement>;
    /** Do not use `LayerManager` on stacking popups */
    disableLayer?: boolean;
    /** @deprecated Add onClick handler to children */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    /** `mouseenter` event handler */
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    /** `mouseleave` event handler */
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    /** `focus` event handler */
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    /** `blur` event handler */
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    /** On start open popup animation void callback */
    onTransitionEnter?: VoidFunction;
    /** On finish open popup animation void callback */
    onTransitionEntered?: VoidFunction;
    /** On start close popup animation void callback */
    onTransitionExit?: VoidFunction;
    /** On finish close popup animation void callback */
    onTransitionExited?: VoidFunction;
    /** Do not use `Portal` for children */
    disablePortal?: boolean;
    /** DOM element children to be mounted to */
    container?: HTMLElement;
    /** HTML `class` attribute for content node */
    contentClassName?: string;
    /** If true, the focus will return to the anchor element */
    restoreFocus?: boolean;
    /** Element the focus will be restored to, depends on `restoreFocus` */
    restoreFocusRef?: React.RefObject<HTMLElement>;
    /** `aria-label` attribute, use this attribute only if you didn't have visible caption */
    'aria-label'?: React.AriaAttributes['aria-label'];
    /** `aria-labelledby` attribute, prefer this attribute if you have visible caption */
    'aria-labelledby'?: React.AriaAttributes['aria-labelledby'];
    /** `aria-modal` attribute, default value is equal to focusTrap */
    'aria-modal'?: React.AriaAttributes['aria-modal'];
    /** `aria-role` attribute */
    role?: React.AriaRole;
    /** HTML `id` attribute */
    id?: string;
    /** Enable focus trapping behavior */
    focusTrap?: boolean;
    /** While open, the focus will be set to the first interactive element in the content */
    autoFocus?: boolean;
}

const b = block('popup');

export function Popup({
    floatingRef,
    keepMounted = false,
    hasArrow = false,
    open,
    strategy,
    placement = 'top',
    offset = 4,
    anchorElement,
    anchorRef,
    floatingContext,
    floatingProps,
    disableEscapeKeyDown,
    disableOutsideClick,
    disableLayer,
    style,
    className,
    contentClassName,
    middlewares,
    children,
    onEscapeKeyDown,
    onOutsideClick,
    onClose,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onTransitionEnter,
    onTransitionEntered,
    onTransitionExit,
    onTransitionExited,
    disablePortal,
    container,
    qa,
    restoreFocus,
    restoreFocusRef,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    role: roleProp,
    id,
    focusTrap = false,
    autoFocus = false,
    'aria-modal': ariaModal = focusTrap,
}: PopupProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);

    const anchor = useAnchor(anchorElement, anchorRef);
    const offsetValue = getOffsetValue(offset, hasArrow);

    let placementValue: Placement | undefined;
    let preventOverflowMiddleware: Middleware;

    if (Array.isArray(placement)) {
        placementValue = placement[0];
        preventOverflowMiddleware = flip({
            altBoundary: disablePortal,
            fallbackPlacements: placement.slice(1),
        });
    } else if (isAutoPlacement(placement)) {
        let alignment: Alignment | undefined;
        if (placement === 'auto-start') {
            alignment = 'start';
        } else if (placement === 'auto-end') {
            alignment = 'end';
        }

        placementValue = undefined;
        preventOverflowMiddleware = autoPlacement({
            altBoundary: disablePortal,
            alignment,
        });
    } else {
        placementValue = placement;
        preventOverflowMiddleware = flip({
            altBoundary: disablePortal,
        });
    }

    useLayer({
        open,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [anchor.ref, containerRef],
        enabled: !disableLayer,
        type: 'popup',
    });

    const {
        refs,
        floatingStyles,
        placement: actualPlacement,
        middlewareData,
    } = useFloating({
        rootContext: floatingContext,
        strategy,
        placement: placementValue,
        open,
        whileElementsMounted: open ? autoUpdate : undefined,
        elements: {
            // @ts-expect-error: Type 'Element | VirtualElement | undefined' is not assignable to type 'Element | null | undefined'.
            reference: anchor.element,
        },
        middleware: middlewares ?? [
            floatingOffset(offsetValue),
            preventOverflowMiddleware,
            shift({limiter: limitShift(), altBoundary: disablePortal}),
            arrow({element: arrowElement, padding: 4}),
        ],
    });

    const arrowStyles: React.CSSProperties = {};

    if (hasArrow && middlewareData.arrow) {
        const {x, y} = middlewareData.arrow;
        arrowStyles.left = x;
        arrowStyles.top = y;
    }

    const handleRef = useForkRef<HTMLDivElement>(
        floatingRef,
        refs.setFloating,
        containerRef,
        useParentFocusTrap(),
    );

    const containerProps = useRestoreFocus({
        enabled: Boolean(restoreFocus && open),
        restoreFocusRef,
    });

    let role = roleProp;
    if ((ariaModal === true || ariaModal === 'true') && !role) {
        role = 'dialog';
    }

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
                onTransitionEnter?.();
            }}
            onEntered={() => {
                onTransitionEntered?.();
            }}
            onExit={() => {
                onTransitionExit?.();
            }}
            onExited={() => {
                onTransitionExited?.();
            }}
        >
            <Portal container={container} disablePortal={disablePortal}>
                <div
                    ref={handleRef}
                    style={floatingStyles}
                    data-floating-placement={actualPlacement}
                    {...containerProps}
                    className={b({open}, className)}
                    data-qa={qa}
                    id={id}
                    role={role}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    aria-modal={ariaModal && open ? ariaModal : undefined}
                    {...floatingProps}
                >
                    <FocusTrap enabled={focusTrap && open} autoFocus={autoFocus}>
                        {/* FIXME The onClick event handler is deprecated and should be removed */}
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
                        <div
                            onClick={onClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            className={b('content', contentClassName)}
                            style={style}
                            tabIndex={-1}
                        >
                            {hasArrow && (
                                <PopupArrow setArrowRef={setArrowElement} styles={arrowStyles} />
                            )}
                            {children}
                        </div>
                    </FocusTrap>
                </div>
            </Portal>
        </CSSTransition>
    );
}
