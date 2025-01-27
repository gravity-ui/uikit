import type * as React from 'react';

import {progressBlock} from './constants';

export interface ProgressInnerTextProps {
    text?: React.ReactNode;
    offset?: number;
}

export function ProgressInnerText(props: ProgressInnerTextProps) {
    const {text, offset = 0} = props;

    if (!text) {
        return null;
    }

    return (
        <div
            className={progressBlock('text-inner')}
            style={{transform: `translateX(calc(var(--g-flow-direction) * ${-offset}%))`}}
        >
            {text}
        </div>
    );
}
