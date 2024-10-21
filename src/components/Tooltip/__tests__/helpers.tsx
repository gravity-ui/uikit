import React from 'react';

import type {TooltipProps} from '../Tooltip';
import {Tooltip} from '../Tooltip';

import {TooltipQA} from './constants';

export const TestTooltip = (props: Omit<TooltipProps, 'content' | 'disablePortal'>) => {
    return (
        <div
            style={{
                width: '300px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Tooltip
                {...props}
                disablePortal
                content={<div data-qa={TooltipQA.tooltipContent}>tooltip content</div>}
            >
                <div
                    style={{border: '1px dotted tomato', display: 'inline'}}
                    data-qa={TooltipQA.trigger}
                >
                    tooltip trigger
                </div>
            </Tooltip>
        </div>
    );
};
