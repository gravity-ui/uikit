'use client';

import * as React from 'react';

import {useDefaultProps} from '../theme/useDefaultProps';

import {TooltipDelayGroupContext} from './TooltipDelayGroupContext';
import type {TooltipDelayGroupContextProps} from './TooltipDelayGroupContext';

export interface TooltipDelayGroupProps {
    /** Tooltips sharing the open delay */
    children?: React.ReactNode;
    /** Milliseconds to stay warm after the last tooltip closes */
    skipDelay?: number;
    /** Close delay in milliseconds while the group is warm */
    closeDelay?: number;
}

const DEFAULT_SKIP_DELAY = 300;
const DEFAULT_CLOSE_DELAY = 200;

export function TooltipDelayGroup(rawProps: TooltipDelayGroupProps) {
    const {
        children,
        skipDelay = DEFAULT_SKIP_DELAY,
        closeDelay = DEFAULT_CLOSE_DELAY,
    } = useDefaultProps('TooltipDelayGroup', rawProps);

    const [warm, setWarm] = React.useState(false);
    const openTooltipsRef = React.useRef(new Set<() => void>());
    const cooldownTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const skipDelayRef = React.useRef(skipDelay);

    React.useEffect(() => {
        skipDelayRef.current = skipDelay;
    }, [skipDelay]);

    React.useEffect(() => () => clearTimeout(cooldownTimerRef.current), []);

    const register = React.useCallback<TooltipDelayGroupContextProps['register']>((close) => {
        const openTooltips = openTooltipsRef.current;

        for (const closeOther of openTooltips) {
            if (closeOther !== close) {
                // Keep controlled tooltips registered until they actually close.
                closeOther();
            }
        }

        openTooltips.add(close);
        clearTimeout(cooldownTimerRef.current);
        setWarm(true);

        return () => {
            openTooltips.delete(close);

            if (openTooltips.size > 0) {
                return;
            }

            clearTimeout(cooldownTimerRef.current);
            cooldownTimerRef.current = setTimeout(() => setWarm(false), skipDelayRef.current);
        };
    }, []);

    const context = React.useMemo<TooltipDelayGroupContextProps>(
        () => ({warm, closeDelay, register}),
        [warm, closeDelay, register],
    );

    return (
        <TooltipDelayGroupContext.Provider value={context}>
            {children}
        </TooltipDelayGroupContext.Provider>
    );
}

TooltipDelayGroup.displayName = 'TooltipDelayGroup';
