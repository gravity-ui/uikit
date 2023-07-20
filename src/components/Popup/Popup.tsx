import React from 'react';

import {CSSTransition} from 'react-transition-group';

import {Portal} from '../Portal';
import type {DOMProps, QAProps} from '../types';
import {FocusTrap, useParentFocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
import {getCSSTransitionClassNames} from '../utils/transition';
import {useActionHandlers} from '../utils/useActionHandlers';
import {useForkRef} from '../utils/useForkRef';
import {useLayer} from '../utils/useLayer';
import type {LayerExtendableProps} from '../utils/useLayer';
import {usePopper} from '../utils/usePopper';
import type {
    PopperAnchorRef,
    PopperModifiers,
    PopperOffset,
    PopperPlacement,
    PopperProps,
} from '../utils/usePopper';
import {useRestoreFocus} from '../utils/useRestoreFocus';

import {PopupArrow} from './PopupArrow';

import './Popup.scss';

export type PopupPlacement = PopperPlacement;
export type PopupAnchorRef = PopperAnchorRef;

export interface PopupProps extends DOMProps, LayerExtendableProps, PopperProps, QAProps {
    open?: boolean;
    children?: React.ReactNode;
    keepMounted?: boolean;
    hasArrow?: boolean;
    disableLayer?: boolean;
    offset?: PopperOffset;
    modifiers?: PopperModifiers;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    disablePortal?: boolean;
    container?: HTMLElement;
    contentClassName?: string;
    restoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    role?: React.AriaRole;
    id?: string;
    focusTrap?: boolean;
    autofocus?: boolean;
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
    disablePortal,
    container,
    strategy,
    qa,
    restoreFocus,
    restoreFocusRef,
    role,
    id,
    focusTrap = false,
    autofocus = false,
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

    const {onKeyDown} = useActionHandlers(onClick);

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
            >
                <div
                    ref={handleRef}
                    style={styles.popper}
                    {...attributes.popper}
                    {...containerProps}
                    className={b({open}, className)}
                    tabIndex={-1}
                    data-qa={qa}
                    id={id}
                    role={role}
                >
                    <FocusTrap enabled={focusTrap && open} disableAutoFocus={!autofocus}>
                        {/* The event handlers should only be used to capture bubbled events */}
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={onClick}
                            onKeyDown={onKeyDown}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            className={b('content', contentClassName)}
                            style={style}
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
