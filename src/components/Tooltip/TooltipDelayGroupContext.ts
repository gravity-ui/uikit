import * as React from 'react';

export interface TooltipDelayGroupContextProps {
    /** Whether a tooltip is open or the cooldown is pending */
    warm: boolean;
    closeDelay: number;
    /** Warms the group, requests others to close, and returns an unregister callback */
    register: (close: () => void) => () => void;
}

export const TooltipDelayGroupContext = React.createContext<TooltipDelayGroupContextProps | null>(
    null,
);
