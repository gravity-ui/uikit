import type {TooltipProps} from '../Tooltip';
import {Tooltip} from '../Tooltip';

import {TooltipQA} from './constants';

export const TestTooltip = (props: Omit<TooltipProps, 'content' | 'disablePortal'>) => {
    return (
        <Tooltip {...props} content={<div data-qa={TooltipQA.tooltipContent}>tooltip content</div>}>
            <div
                style={{
                    width: '200px',
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dotted tomato',
                }}
                data-qa={TooltipQA.trigger}
            >
                <div>tooltip trigger</div>
            </div>
        </Tooltip>
    );
};
