'use client';

import * as React from 'react';

import {FloatingDelayGroup} from '@floating-ui/react';

import {useDefaultProps} from '../theme/useDefaultProps';

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

    return (
        <FloatingDelayGroup delay={{open: 0, close: closeDelay}} timeoutMs={skipDelay}>
            {children}
        </FloatingDelayGroup>
    );
}

TooltipDelayGroup.displayName = 'TooltipDelayGroup';
