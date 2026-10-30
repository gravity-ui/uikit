import * as React from 'react';

import {useControlledState} from '../../../hooks/useControlledState';
import type {SheetOpenChangeReason, SheetProps} from '../Sheet';

export interface SheetDismissRequest {
    reason: SheetOpenChangeReason;
    event?: Event;
    immediate?: boolean;
}

export interface UseSheetDismissResult {
    open: boolean;
    immediate: boolean;
    requestDismiss: (request: SheetDismissRequest) => void;
}

export function useSheetDismiss({
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    disableEscapeKeyDown = false,
    disableOutsideClick = false,
}: {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: SheetProps['onOpenChange'];
    disableEscapeKeyDown?: boolean;
    disableOutsideClick?: boolean;
}): UseSheetDismissResult {
    const [open, setOpen] = useControlledState<
        boolean,
        boolean,
        [event?: Event, reason?: SheetOpenChangeReason]
    >(openProp, defaultOpen, onOpenChange);
    const [immediate, setImmediate] = React.useState(false);

    // Depend on immediate to reset a refused full-height swipe even when open stays true.
    // Otherwise a later external close could incorrectly skip its transition.
    React.useEffect(() => {
        if (open) {
            setImmediate(false);
        }
    }, [immediate, open]);

    const requestDismiss = React.useCallback(
        (request: SheetDismissRequest) => {
            if (
                !open ||
                (disableEscapeKeyDown && request.reason === 'escape-key') ||
                (disableOutsideClick && request.reason === 'outside-press')
            ) {
                return;
            }

            setImmediate(Boolean(request.immediate));
            setOpen(false, request.event, request.reason);
        },
        [disableEscapeKeyDown, disableOutsideClick, open, setOpen],
    );

    return {open, immediate, requestDismiss};
}
