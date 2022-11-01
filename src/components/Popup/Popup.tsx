import React from 'react';

import {block} from '../utils/cn';
import {DOMProps, QAProps} from '../types';
import {Portal} from '../Portal';
import {useLayer, LayerExtendableProps} from '../utils/useLayer';
import {
    usePopper,
    PopperAnchorRef,
    PopperModifiers,
    PopperOffset,
    PopperPlacement,
    PopperProps,
} from '../utils/usePopper';
import {PopupArrow} from './PopupArrow';
import {usePreviousValue} from '../utils/usePreviousValue';
import {useForceUpdate} from '../utils/useForceUpdate';
import {useForkRef} from '../utils/useForkRef';

import './Popup.scss';

export type PopupPlacement = PopperPlacement;
export type PopupAnchorRef = PopperAnchorRef;

export interface PopupProps extends DOMProps, LayerExtendableProps, PopperProps, QAProps {
    open?: boolean;
    children?: React.ReactNode;
    keepMounted?: boolean;
    hasArrow?: boolean;
    disableEscapeKeyDown?: boolean;
    disableLayer?: boolean;
    offset?: PopperOffset;
    modifiers?: PopperModifiers;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    container?: HTMLElement;
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
    modifiers = [],
    children,
    onEscapeKeyDown,
    onOutsideClick,
    onClose,
    onClick,
    onMouseEnter,
    onMouseLeave,
    container,
    strategy,
    qa,
}: PopupProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inTransition = React.useRef(false);
    const hasBeenOpen = React.useRef(false);
    const previousOpen = usePreviousValue(open);
    const forceUpdate = useForceUpdate();

    if (open) {
        hasBeenOpen.current = true;
    }

    if (typeof previousOpen !== 'undefined' && !inTransition.current) {
        inTransition.current = open !== previousOpen;
    }

    function handleAnimationEnd() {
        inTransition.current = false;
        forceUpdate();
    }

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
        modifiers: [
            // Should be disabled cause we have own transforms on the root element
            {name: 'computeStyles', options: {gpuAcceleration: false}},
            // Properly display arrow within rounded container
            {name: 'arrow', options: {enabled: hasArrow, padding: 4}},
            // Prevent border hiding
            {name: 'preventOverflow', options: {padding: 1}},
            ...modifiers,
        ],
    });

    const handleRef = useForkRef(containerRef, (ref) => setPopperRef(ref));

    if (!keepMounted && !open && !inTransition.current) {
        return null;
    }

    return (
        <Portal container={container}>
            <div
                ref={handleRef}
                data-inited={hasBeenOpen.current ? '' : undefined}
                onAnimationEnd={handleAnimationEnd}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                tabIndex={-1}
                className={b({open}, className)}
                style={{...style, ...styles.popper}}
                {...attributes.popper}
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
        </Portal>
    );
}
