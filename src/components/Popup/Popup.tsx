import React from 'react';

import {CSSTransition} from 'react-transition-group';

import {useForkRef} from '../../hooks';
import {usePopper, useRestoreFocus} from '../../hooks/private';
import type {PopperAnchorRef, PopperPlacement, PopperProps} from '../../hooks/private';
import {Portal} from '../Portal';
import type {DOMProps, QAProps} from '../types';
import {FocusTrap, useParentFocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
import {useLayer} from '../utils/layer-manager';
import type {LayerExtendableProps} from '../utils/layer-manager/LayerManager';
import {getCSSTransitionClassNames} from '../utils/transition';

import {PopupArrow} from './PopupArrow';

import './Popup.scss';

export type PopupPlacement = PopperPlacement;
export type PopupAnchorRef = PopperAnchorRef;

export interface PopupProps extends DOMProps, LayerExtendableProps, PopperProps, QAProps {
    children?: React.ReactNode;
    /** Manages `Popup` visibility */
    open?: boolean;
    /** `Popup` will not be removed from the DOM upon hiding */
    keepMounted?: boolean;
    /** Render an arrow pointing to the anchor */
    hasArrow?: boolean;
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
const ARROW_SIZE = 8;
export function Popup({
    keepMounted = false,
    hasArrow = false,
    offset = [0, 4],
    open,
    placement,
    anchorRef,
    disableEscapeKeyDown,
    disableOutsideClick,
    disableLayer,
    style,
    className,
    contentClassName,
    modifiers = [],
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
    strategy,
    qa,
    restoreFocus,
    restoreFocusRef,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    role,
    id,
    focusTrap = false,
    autoFocus = false,
}: PopupProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);

    useLayer({
        open,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [anchorRef, containerRef],
        enabled: !disableLayer,
        type: 'popup',
    });

    const {attributes, styles, setPopperRef, setArrowRef} = usePopper({
        anchorRef,
        placement,
        // Take arrow size into offset account
        offset: hasArrow ? [offset[0], offset[1] + ARROW_SIZE] : offset,
        strategy,
        altBoundary: disablePortal,
        modifiers: [
            // Properly display arrow within rounded container
            {name: 'arrow', options: {enabled: hasArrow, padding: 4}},
            // Prevent border hiding
            {name: 'preventOverflow', options: {padding: 1, altBoundary: disablePortal}},
            ...modifiers,
        ],
    });
    const handleRef = useForkRef<HTMLDivElement>(setPopperRef, containerRef, useParentFocusTrap());

    const containerProps = useRestoreFocus({
        enabled: Boolean(restoreFocus && open),
        restoreFocusRef,
    });

    return (
        <Portal container={container} disablePortal={disablePortal}>
            <CSSTransition
                nodeRef={containerRef}
                in={open}
                addEndListener={(done) =>
                    containerRef.current?.addEventListener('animationend', done)
                }
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
                <div
                    ref={handleRef}
                    style={styles.popper}
                    {...attributes.popper}
                    {...containerProps}
                    className={b({open}, className)}
                    data-qa={qa}
                    id={id}
                    role={role}
                    aria-label={ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                >
                    <FocusTrap enabled={focusTrap && open} disableAutoFocus={!autoFocus}>
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
                                <PopupArrow
                                    styles={styles.arrow}
                                    attributes={attributes.arrow}
                                    setArrowRef={setArrowRef}
                                />
                            )}
                            {children}
                        </div>
                    </FocusTrap>
                </div>
            </CSSTransition>
        </Portal>
    );
}
