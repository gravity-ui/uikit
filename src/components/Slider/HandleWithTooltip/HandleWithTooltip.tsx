import React from 'react';

import {SliderTooltip} from '../SliderTooltip/SliderTooltip';
import type {HandleWithTooltipProps} from '../types';

export const HandleWithTooltip = ({
    originHandle,
    originHandleProps,
    stateModifiers,
    className,
    tooltipFormat,
}: HandleWithTooltipProps) => {
    // const [tooltipVisible, setTooltipVisible] = useState(false);
    const styleProp = stateModifiers.rtl ? 'right' : 'left';
    const tooltipContent = tooltipFormat
        ? tooltipFormat(originHandleProps.value)
        : originHandleProps.value;

    return (
        <React.Fragment>
            {originHandle}
            <SliderTooltip
                className={className}
                style={{
                    insetInlineStart: originHandle.props.style?.[styleProp],
                }}
                stateModifiers={stateModifiers}
            >
                {tooltipContent}
            </SliderTooltip>
        </React.Fragment>
    );
};
