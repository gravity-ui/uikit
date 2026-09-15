import * as React from 'react';

import type {SheetOpenChangeReason, SheetProps} from '../Sheet';

export interface SheetDismissRequest {
    reason: SheetOpenChangeReason;
    event?: Event;
    immediate?: boolean;
}

export interface UseSheetDismissResult {
    requestedOpen: boolean;
    immediate: boolean;
    requestDismiss: (request: SheetDismissRequest) => void;
}

export function useSheetDismiss({
    visible,
    onOpenChange,
    disableEscapeKeyDown = false,
    disableOutsideClick = false,
}: {
    visible: boolean;
    onOpenChange?: SheetProps['onOpenChange'];
    disableEscapeKeyDown?: boolean;
    disableOutsideClick?: boolean;
}): UseSheetDismissResult {
    const [legacyDismissed, setLegacyDismissed] = React.useState(false);
    const [immediate, setImmediate] = React.useState(false);
    const isControlled = Boolean(onOpenChange);
    const requestedOpen = isControlled ? visible : visible && !legacyDismissed;

    React.useEffect(() => {
        if (visible) {
            setLegacyDismissed(false);
        }
    }, [visible]);

    // Depend on immediate to reset a refused full-height swipe even when requestedOpen stays true.
    // Otherwise a later external close could incorrectly skip its transition.
    React.useEffect(() => {
        if (requestedOpen) {
            setImmediate(false);
        }
    }, [immediate, requestedOpen]);

    const requestDismiss = React.useCallback(
        (request: SheetDismissRequest) => {
            if (
                !requestedOpen ||
                (disableEscapeKeyDown && request.reason === 'escape-key') ||
                (disableOutsideClick && request.reason === 'outside-press')
            ) {
                return;
            }

            setImmediate(Boolean(request.immediate));

            if (onOpenChange) {
                onOpenChange(false, request.event, request.reason);
            } else {
                setLegacyDismissed(true);
            }
        },
        [disableEscapeKeyDown, disableOutsideClick, onOpenChange, requestedOpen],
    );

    return {requestedOpen, immediate, requestDismiss};
}
