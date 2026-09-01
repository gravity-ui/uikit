import * as React from 'react';

import type {SheetProps} from '../Sheet';

export type SheetDismissReason = 'escape-key' | 'outside-press' | 'swipe' | 'navigation';

export interface SheetDismissRequest {
    reason: SheetDismissReason;
    event?: Event;
    immediate?: boolean;
}

export interface UseSheetDismissResult {
    requestedOpen: boolean;
    requestDismiss: (request: SheetDismissRequest) => void;
}

export function useSheetDismiss({
    visible,
    onOpenChange,
}: {
    visible: boolean;
    onOpenChange?: SheetProps['onOpenChange'];
}): UseSheetDismissResult {
    const [legacyDismissed, setLegacyDismissed] = React.useState(false);
    const isControlled = Boolean(onOpenChange);
    const requestedOpen = isControlled ? visible : visible && !legacyDismissed;

    React.useEffect(() => {
        if (visible) {
            setLegacyDismissed(false);
        }
    }, [visible]);

    const requestDismiss = React.useCallback(
        (request: SheetDismissRequest) => {
            if (!requestedOpen) {
                return;
            }

            if (onOpenChange) {
                onOpenChange(false, request.event, request.reason);
            } else {
                setLegacyDismissed(true);
            }
        },
        [onOpenChange, requestedOpen],
    );

    return {requestedOpen, requestDismiss};
}
