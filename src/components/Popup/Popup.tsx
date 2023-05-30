import React from 'react';

import {CSSTransition} from 'react-transition-group';

import {Portal} from '../Portal';
import {DOMProps, QAProps} from '../types';
import {useParentFocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
import {getCSSTransitionClassNames} from '../utils/transition';
import {useForkRef} from '../utils/useForkRef';
import {LayerExtendableProps, useLayer} from '../utils/useLayer';
import {
    PopperAnchorRef,
    PopperModifiers,
    PopperOffset,
    PopperPlacement,
    PopperProps,
    usePopper,
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
    disablePortal?: boolean;
    container?: HTMLElement;
    restoreFocus?: boolean;
    restoreFocusRef?: React.RefObject<HTMLElement>;
}

const b = block('popup');
const bWrapper = block('popup-wrapper');
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
    modifiers = [],
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

    return (
        <Portal container={container} disablePortal={disablePortal}>
            <CSSTransition
                nodeRef={containerRef}
                in={open}
                addEndListener={(done) =>
                    containerRef.current?.addEventListener('animationend', done)
                }
                classNames={getCSSTransitionClassNames(bWrapper)}
                mountOnEnter={!keepMounted}
                unmountOnExit={!keepMounted}
                appear={true}
            >
                <div
                    ref={handleRef}
                    style={styles.popper}
                    {...attributes.popper}
                    {...containerProps}
                    className={bWrapper({open})}
                >
                    <div
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className={b({open}, className)}
                        style={style}
                        data-qa={qa}
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
                </div>
            </CSSTransition>
        </Portal>
    );
}
