import React from 'react';

import type popper from '@popperjs/core';
import {usePopper as useReactPopper} from 'react-popper';
import type {Modifier} from 'react-popper';

import {useDirection} from '../theme';

export type PopperPlacement = popper.Placement | popper.Placement[];
export type PopperOffset = [number, number];
export type PopperModifiers = Modifier<unknown, Record<string, unknown>>[];
export type PopperAnchorRef = React.RefObject<Element | popper.VirtualElement>;

export interface PopperProps {
    anchorRef?: PopperAnchorRef;
    placement?: PopperPlacement;
    offset?: [number, number];
    modifiers?: PopperModifiers;
    strategy?: popper.PositioningStrategy;
    altBoundary?: boolean;
}

const DEFAULT_PLACEMENT: PopperPlacement = [
    'bottom-start',
    'bottom',
    'bottom-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'left-start',
    'left',
    'left-end',
];

const rtlOffsetFix: popper.Modifier<'rtlOffsetFix', {}> = {
    name: 'rtlOffsetFix',
    enabled: true,
    phase: 'main',
    requires: ['offset'],
    fn({state}) {
        if (!state.placement.startsWith('top') && !state.placement.startsWith('bottom')) {
            return;
        }

        const offsets = state.modifiersData.offset?.[state.placement];

        if (!offsets) {
            return;
        }

        state.modifiersData.popperOffsets!.x -= offsets.x * 2;
    },
};

export function usePopper({
    anchorRef,
    placement = DEFAULT_PLACEMENT,
    offset,
    modifiers = [],
    strategy,
    altBoundary,
}: PopperProps) {
    const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
    const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);
    const direction = useDirection();

    const placements = React.useMemo(() => {
        let items = Array.isArray(placement) ? placement : [placement];

        if (direction === 'rtl') {
            items = items.map(
                (p) =>
                    p.replace(/(top|bottom)-(start|end)/g, (match, position, value) => {
                        if (value === 'start') {
                            return position + '-end';
                        }
                        if (value === 'end') {
                            return position + '-start';
                        }
                        return match;
                    }) as popper.Placement,
            );
        }

        return items;
    }, [placement, direction]);

    const {attributes, styles} = useReactPopper(anchorRef?.current, popperElement, {
        strategy,
        modifiers: [
            {name: 'arrow', options: {element: arrowElement}},
            {name: 'offset', options: {offset, altBoundary}},
            {name: 'flip', options: {fallbackPlacements: placements.slice(1), altBoundary}},
            ...(direction === 'rtl' ? [rtlOffsetFix] : []),
            ...modifiers,
        ],
        placement: placements[0],
    });

    return {
        attributes,
        styles,
        setPopperRef: setPopperElement,
        setArrowRef: setArrowElement,
    };
}
