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
    const visibleOnHover = stateModifiers.tooltipDisplay === 'auto';
    const [tooltipVisible, setTooltipVisible] = React.useState(false);

    if (stateModifiers.tooltipDisplay === 'on' && !tooltipVisible) {
        setTooltipVisible(true);
    }

    const styleProp = stateModifiers.rtl ? 'right' : 'left';
    const tooltipContent = tooltipFormat
        ? tooltipFormat(originHandleProps.value)
        : originHandleProps.value;

    const handleMouseEnter = React.useCallback(() => {
        if (visibleOnHover) {
            setTooltipVisible(true);
        }
    }, [visibleOnHover]);
    const handleMouseLeave = React.useCallback(() => {
        if (visibleOnHover) {
            setTooltipVisible(true);
        }
    }, [visibleOnHover]);

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {originHandle}
            {tooltipVisible && (
                <SliderTooltip
                    className={className}
                    style={{
                        insetInlineStart: originHandle.props.style?.[styleProp],
                    }}
                    stateModifiers={stateModifiers}
                >
                    {tooltipContent}
                </SliderTooltip>
            )}
        </div>
    );
};
