import React from 'react';

import type popper from '@floating-ui/react';
import {
    arrow,
    autoUpdate,
    offset,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';

export type PopperOffset = [number, number];
export type PopperAnchorRef = popper.ReferenceType | null;
export type PopperArrowRef = popper.ArrowOptions['element'];
export type PopperPlacement = popper.Placement | 'auto';
export type PopperMiddleware = popper.Middleware;

export interface PopperProps {
    anchorRef: PopperAnchorRef;

    initialOpen?: boolean;
    placement?: PopperPlacement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    arrowRef?: PopperArrowRef;
    offsetOptions?: popper.OffsetOptions;
    middleware?: PopperMiddleware[];
    strategy?: popper.Strategy;

    // altBoundary?: boolean;
}

export function usePopper({
    anchorRef,
    strategy,
    initialOpen = false,
    arrowRef = null,
    placement = 'auto',
    middleware = [],
    offsetOptions,
    open: controlledOpen,
    onOpenChange: setControlledOpen,
}: // altBoundary,
PopperProps) {
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
        middleware: [arrow({element: arrowRef}), offset(offsetOptions), ...middleware],
    });

    const context = floatingData.context;

    const hover = useHover(context, {
        // move: false,
        enabled: controlledOpen === undefined,
    });
    const focus = useFocus(context, {
        enabled: controlledOpen === undefined,
    });
    const dismiss = useDismiss(context);
    const role = useRole(
        context,
        // , {role: 'tooltip'}
    );

    const interactions = useInteractions([hover, focus, dismiss, role]);

    return React.useMemo(
        () => ({
            interactions,
            ...floatingData,
        }),
        [floatingData, interactions],
    );
}
