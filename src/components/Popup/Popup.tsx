import React from 'react';

import {
    // FloatingFocusManager
    FloatingArrow,
    MiddlewareState,
    Side,
    UseTransitionStylesProps,
    arrow,
    offset,
    useTransitionStyles,
} from '@floating-ui/react';

import {Portal} from '../Portal';
import type {DOMProps, QAProps} from '../types';
// import {useParentFocusTrap} from '../utils/FocusTrap';
import {block} from '../utils/cn';
// import {getCSSTransitionClassNames} from '../utils/transition';
// import {useForkRef} from '../utils/useForkRef';
import {useLayer} from '../utils/useLayer';
import type {LayerExtendableProps} from '../utils/useLayer';
import {PopperOffsetOptions, usePopper} from '../utils/usePopper';
import type {PopperAnchorRef, PopperPlacement, PopperProps} from '../utils/usePopper';
import {useRestoreFocus} from '../utils/useRestoreFocus';

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
    offsetOptions?: PopperOffsetOptions;
}

const b = block('popup');

const DEFAULT_DISTANCE = '4px';
const TRANSITION_DISTANCE = '10px';

type PopupTranslateOptions = Record<
    Side,
    Record<keyof Pick<UseTransitionStylesProps, 'initial' | 'open'>, string>
>;

const TRANSLATE_OPTIONS: PopupTranslateOptions = {
    bottom: {
        open: `translateY(${DEFAULT_DISTANCE})`,
        initial: `translateY(${TRANSITION_DISTANCE})`,
    },
    top: {
        open: `translateY(-${DEFAULT_DISTANCE})`,
        initial: `translateY(-${TRANSITION_DISTANCE})`,
    },
    right: {
        open: `translateX(${DEFAULT_DISTANCE})`,
        initial: `translateX(${TRANSITION_DISTANCE})`,
    },
    left: {
        open: `translateX(-${DEFAULT_DISTANCE})`,
        initial: `translate(-${TRANSITION_DISTANCE})`,
    },
};

const ARROW_SIZE = 8;

export function Popup({
    keepMounted = false,
    hasArrow = false,
    offsetOptions = 0,
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
    const arrowRef = React.useRef<SVGSVGElement | null>(null);

    const deriveOffset = React.useCallback(
        (state: MiddlewareState) => {
            if (typeof offsetOptions === 'number') {
                return hasArrow ? offsetOptions + ARROW_SIZE : offsetOptions;
            }

            if (typeof offsetOptions === 'function') {
                const offsetValue = offsetOptions(state);

                return typeof offsetValue === 'number'
                    ? offsetValue + (Number(hasArrow) && ARROW_SIZE)
                    : {
                          ...offsetValue,
                          mainAxis: (offsetValue.mainAxis ?? 0) + (Number(hasArrow) && ARROW_SIZE),
                      };
            }

            return hasArrow
                ? {...offsetOptions, mainAxis: (offsetOptions.mainAxis ?? 0) + ARROW_SIZE}
                : offsetOptions;
        },
        [offsetOptions, hasArrow],
    );

    const {
        refs,
        context,
        interactions,
        placement: popperPlacement,
    } = usePopper({
        anchorRef,
        open,
        placement,
        strategy,
        middleware: [arrow({element: arrowRef}), offset(deriveOffset), ...middleware],
    });

    const {isMounted, styles} = useTransitionStyles(context, {
        duration: 100,
        initial: ({side}) => ({
            transform: TRANSLATE_OPTIONS[side].initial,
            opacity: 0,
        }),
        open: ({side}) => ({
            transform: TRANSLATE_OPTIONS[side].open,
            opacity: 1,
        }),
        close: ({side}) => ({
            transform: TRANSLATE_OPTIONS[side].initial,
            opacity: 0,
        }),
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
                    role={role}
                    {...containerProps}
                    {...interactions.getFloatingProps()}
                >
                    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                    <div
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className={b('content', contentClassName)}
                        style={{...styles, ...style}}
                    >
                        {hasArrow && (
                            // <PopupArrow
                            //     // styles={styles.arrow}
                            //     // attributes={attributes.arrow}
                            //     setArrowRef={setArrowRef}
                            // />
                            <FloatingArrow
                                ref={arrowRef}
                                context={context}
                                className={b('arrow')}
                            />
                        )}
                        {children}
                    </div>
                </div>
                // </FloatingFocusManager>
            )}
        </Portal>
    );
}
