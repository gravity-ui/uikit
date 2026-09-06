import * as React from 'react';

export interface TooltipDelayGroupContextProps {
    /** Whether some tooltip of the group is open or was closed less than `skipDelay` ago */
    warm: boolean;
    /** Delay in ms before close applied to the group members while the group is warm */
    closeDelay: number;
    /**
     * Registers an open tooltip: closes the previously open one and warms the group up.
     * Returned callback unregisters the tooltip and starts the cooldown.
     */
    register: (close: () => void) => () => void;
}

export const TooltipDelayGroupContext = React.createContext<TooltipDelayGroupContextProps | null>(
    null,
);
