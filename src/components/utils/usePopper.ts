import React from 'react';

import type popper from '@floating-ui/react';
import {
    Side,
    UseTransitionStylesProps,
    arrow,
    autoUpdate,
    flip,
    offset,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
    useTransitionStyles,
} from '@floating-ui/react';

export type PopupTranslateOptions = Record<
    Side,
    Record<keyof Pick<UseTransitionStylesProps, 'initial' | 'open'>, string>
>;
export type PopperAnchorRef = popper.ReferenceType | null;
export type PopperArrowRef = popper.ArrowOptions['element'];
export type PopperPlacement = popper.Placement | 'auto';
export type PopperFlipOptions = popper.FlipOptions;
export type PopperMiddleware = popper.Middleware;
export type PopperOffsetOptions = popper.OffsetOptions;
export type PopperRole = popper.UseRoleProps['role'];

export interface PopperProps {
    anchorRef: PopperAnchorRef;
    arrowRef?: PopperArrowRef;

    role?: popper.UseRoleProps['role'];
    hasArrow?: boolean;
    initialOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    middleware?: PopperMiddleware[];
    strategy?: popper.Strategy;
    placement?: PopperPlacement;
    offsetOptions?: PopperOffsetOptions;
    altBoundary?: boolean;
    flipOptons?: PopperFlipOptions;
}

const ARROW_SIZE = 8;
const DEFAULT_DISTANCE = 10;
const TRANSITION_DISTANCE = 4;

const getTransform = (side: Side, hasArrow = false) => {
    const initialDistance = hasArrow ? DEFAULT_DISTANCE + ARROW_SIZE : DEFAULT_DISTANCE;
    const transitionDistance = hasArrow ? TRANSITION_DISTANCE + ARROW_SIZE : TRANSITION_DISTANCE;

    const TRANSLATE_OPTIONS: PopupTranslateOptions = {
        bottom: {
            open: `translateY(${transitionDistance}px)`,
            initial: `translateY(${initialDistance}px)`,
        },
        top: {
            open: `translateY(-${transitionDistance}px)`,
            initial: `translateY(-${initialDistance}px)`,
        },
        right: {
            open: `translateX(${transitionDistance}px)`,
            initial: `translateX(${initialDistance}px)`,
        },
        left: {
            open: `translateX(-${DEFAULT_DISTANCE})`,
            initial: `translate(-${initialDistance}px)`,
        },
    };

    return TRANSLATE_OPTIONS[side];
};

export function usePopper({
    anchorRef,
    strategy,
    arrowRef = null,
    flipOptons = {},
    role: popperRole,
    offsetOptions = 0,
    hasArrow = false,
    initialOpen = false,
    placement = 'auto',
    middleware = [],
    altBoundary = false,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
}: PopperProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const floatingData = useFloating({
        open,
        onOpenChange: setOpen,
        strategy,
        placement: placement === 'auto' ? undefined : placement,
        whileElementsMounted: autoUpdate,
        elements: {
            reference: anchorRef,
        },
        middleware: [
            offset(offsetOptions),
            flip((state) => ({
                altBoundary,
                fallbackPlacements: ['bottom', 'top'],
                ...state,
                ...flipOptons,
            })),
            arrow({element: arrowRef}),
            ...middleware,
        ],
    });

    const context = floatingData.context;

    const transition = useTransitionStyles(context, {
        duration: 100,
        initial: ({side}) => ({
            transform: getTransform(side, hasArrow).initial,
            opacity: 0,
        }),
        open: ({side}) => ({
            transform: getTransform(side, hasArrow).open,
            opacity: 1,
        }),
        close: ({side}) => ({
            transform: getTransform(side, hasArrow).initial,
            opacity: 0,
        }),
    });

    const hover = useHover(context, {
        // move: false,
        enabled: controlledOpen === undefined,
    });
    const focus = useFocus(context, {
        enabled: controlledOpen === undefined,
    });
    const dismiss = useDismiss(context);
    const role = useRole(context, {role: popperRole});

    const interactions = useInteractions([hover, focus, dismiss, role]);

    return React.useMemo(
        () => ({
            interactions,
            transition,
            ...floatingData,
        }),
        [floatingData, interactions, transition],
    );
}
