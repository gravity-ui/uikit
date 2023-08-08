import React from 'react';

import {Portal} from '../Portal';
import type {DOMProps, QAProps} from '../types';
// import {useParentFocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
// import {getCSSTransitionClassNames} from '../utils/transition';
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

export interface PopupProps
    extends DOMProps,
        LayerExtendableProps,
        Omit<PopperProps, 'arrowRef'>,
        QAProps {
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
    id?: string;
}

const b = block('popup');

export function Popup({
    hasArrow = false,
    keepMounted = false,
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
    qa,
    restoreFocus,
    restoreFocusRef,
    id,
    ...popupProps
}: PopupProps) {
    const [arrowRef, setArrowRef] = React.useState<HTMLDivElement | null>(null);

    const {
        refs,
        context,
        interactions: {getFloatingProps},
        placement: popperPlacement,
        middlewareData: {arrow: arrowData},
        transition: {isMounted, styles},
    } = usePopper({
        arrowRef,
        middleware,
        altBoundary: disablePortal,
        hasArrow,
        ...popupProps,
    });

    useLayer({
        open: isMounted,
        disableEscapeKeyDown,
        disableOutsideClick,
        onEscapeKeyDown,
        onOutsideClick,
        onClose,
        contentRefs: [refs.reference, refs.floating],
        enabled: !disableLayer,
    });

    // const handleRef = useForkRef<HTMLDivElement>(refs.setFloating, useParentFocusTrap());

    const containerProps = useRestoreFocus({
        enabled: Boolean(restoreFocus && isMounted),
        restoreFocusRef,
    });

    return (
        <Portal container={container} disablePortal={disablePortal}>
            {(keepMounted || isMounted) && (
                // <FloatingFocusManager context={context} modal={false}>
                <div
                    ref={refs.setFloating}
                    style={context.floatingStyles}
                    // {...attributes.popper}
                    className={b(null, className)}
                    data-placement={popperPlacement}
                    tabIndex={-1}
                    data-qa={qa}
                    id={id}
                    {...containerProps}
                    {...getFloatingProps()}
                >
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <div
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className={b('content', contentClassName)}
                        style={{...styles, ...style}}
                    >
                        {hasArrow && <PopupArrow data={arrowData} setArrowRef={setArrowRef} />}
                        {children}
                    </div>
                </div>
                // </FloatingFocusManager>
            )}
        </Portal>
    );
}
