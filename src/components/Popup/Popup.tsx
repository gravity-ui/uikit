import React from 'react';

import {CSSTransition} from 'react-transition-group';

import {Portal} from '../Portal';
import type {DOMProps, QAProps} from '../types';
// import {useParentFocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
import {getCSSTransitionClassNames} from '../utils/transition';
// import {useForkRef} from '../utils/useForkRef';
import {useLayer} from '../utils/useLayer';
import type {LayerExtendableProps} from '../utils/useLayer';
import {usePopper} from '../utils/usePopper';
import type {PopperAnchorRef, PopperPlacement, PopperProps} from '../utils/usePopper';
import {useRestoreFocus} from '../utils/useRestoreFocus';

import {PopupArrow} from './PopupArrow';

import './Popup.scss';

export type PopupPlacement = PopperPlacement;
export type PopupAnchorRef = PopperAnchorRef;

export interface PopupProps extends DOMProps, LayerExtendableProps, PopperProps, QAProps {
    open: boolean;
    children?: React.ReactNode;
    keepMounted?: boolean;
    hasArrow?: boolean;
    disableLayer?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    disablePortal?: boolean;
    container?: HTMLElement;
    contentClassName?: string;
    restoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
    role?: React.AriaRole;
    id?: string;
}

const b = block('popup');
// const ARROW_SIZE = 8;

export function Popup({
    keepMounted = false,
    hasArrow = false,
    // offset = [0, 4],
    offsetOptions = {},
    open,
    placement,
    anchorRef,
    disableEscapeKeyDown,
    disableOutsideClick,
    disableLayer,
    style,
    className,
    contentClassName,
    middleware = [],
    children,
    onEscapeKeyDown,
    onOutsideClick,
    onClose,
    onClick,
    onMouseEnter,
    onMouseLeave,
    disablePortal,
    container,
    strategy,
    qa,
    restoreFocus,
    restoreFocusRef,
    role,
    id,
}: PopupProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const arrowRef = React.useRef<HTMLDivElement>(null);

    const {refs, context, interactions} = usePopper({
        anchorRef,
        open,
        placement,
        offsetOptions,
        strategy,
        middleware,
    });

    useLayer({
        open: context.open,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [refs.reference, containerRef],
        enabled: !disableLayer,
    });

    // const handleRef = useForkRef<HTMLDivElement>(
    //     refs.setFloating,
    //     containerRef,
    //     useParentFocusTrap(),
    // );

    const containerProps = useRestoreFocus({
        enabled: Boolean(restoreFocus && context.open),
        restoreFocusRef,
    });

    return (
        <Portal container={container} disablePortal={disablePortal}>
            <CSSTransition
                nodeRef={containerRef}
                in={context.open}
                addEndListener={(done) =>
                    containerRef.current?.addEventListener('animationend', done)
                }
                classNames={getCSSTransitionClassNames(b)}
                mountOnEnter={!keepMounted}
                unmountOnExit={!keepMounted}
                appear={true}
            >
                <div
                    ref={refs.setFloating}
                    style={context.floatingStyles}
                    // {...attributes.popper}
                    {...containerProps}
                    {...interactions.getFloatingProps()}
                    className={b({open: context.open}, className)}
                    tabIndex={-1}
                    data-qa={qa}
                    id={id}
                    role={role}
                >
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <div
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className={b('content', contentClassName)}
                        style={style}
                    >
                        {hasArrow && (
                            <PopupArrow
                                // styles={styles.arrow}
                                // attributes={attributes.arrow}
                                setArrowRef={arrowRef}
                            />
                        )}
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </Portal>
    );
}
