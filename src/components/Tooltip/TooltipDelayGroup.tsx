'use client';

import * as React from 'react';

import {FloatingDelayGroup} from '@floating-ui/react';

import {useDefaultProps} from '../theme/useDefaultProps';

export interface TooltipDelayGroupProps {
    children?: React.ReactNode;
    /** How much time in ms after the last tooltip is closed the group stays warm */
    skipDelay?: number;
}

const DEFAULT_SKIP_DELAY = 300;

export function TooltipDelayGroup(rawProps: TooltipDelayGroupProps) {
    const {children, skipDelay = DEFAULT_SKIP_DELAY} = useDefaultProps(
        'TooltipDelayGroup',
        rawProps,
    );

    // Every tooltip keeps its own delays, the group only tracks the warm phase
    return (
        <FloatingDelayGroup delay={0} timeoutMs={skipDelay}>
            {children}
        </FloatingDelayGroup>
    );
}

TooltipDelayGroup.displayName = 'TooltipDelayGroup';
