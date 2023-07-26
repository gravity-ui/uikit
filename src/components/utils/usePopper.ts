// import React from 'react';

import type popper from '@floating-ui/react';
import {arrow, autoUpdate, offset, useFloating} from '@floating-ui/react';

export type PopperOffset = [number, number];
export type PopperAnchorRef = popper.ReferenceType | null;
export type PopperArrowRef = popper.ArrowOptions['element'];
export type PopperPlacement = popper.Placement;
export type PopperMiddleware = popper.Middleware;

export interface PopperProps {
    open: boolean;
    anchorRef: PopperAnchorRef;

    arrowRef?: PopperArrowRef;
    placement?: PopperPlacement;
    offsetOptions?: popper.OffsetOptions;
    middleware: PopperMiddleware[];
    strategy?: popper.Strategy;
    altBoundary?: boolean;
}

export function usePopper({
    anchorRef,
    // open,
    arrowRef = null,
    placement,
    offsetOptions,
    middleware = [],
    strategy,
}: // altBoundary,
PopperProps) {
    // const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
    // const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);
    // const placements = Array.isArray(placement) ? placement : [placement];

    const {refs, context} = useFloating({
        // open,
        strategy,
        placement,
        elements: {
            reference: anchorRef,
        },
        middleware: [arrow({element: arrowRef}), offset(offsetOptions), ...middleware],
        whileElementsMounted: autoUpdate,
    });

    // const {attributes, styles} = useReactPopper(anchorRef?.current, popperElement, {
    //     strategy,
    //     modifiers: [
    //         {name: 'arrow', options: {element: arrowElement}},
    //         {name: 'offset', options: {offset, altBoundary}},
    //         {name: 'flip', options: {fallbackPlacements: placements.slice(1), altBoundary}},
    //         ...modifiers,
    //     ],
    //     placement: placements[0],
    // });

    return {
        refs,
        context,
        // setPopperRef: setPopperElement,
        // setArrowRef: setArrowElement,
    };
}
