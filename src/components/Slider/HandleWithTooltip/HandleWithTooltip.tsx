import * as React from 'react';

import {SliderTooltip} from '../SliderTooltip/SliderTooltip';
import type {HandleWithTooltipProps} from '../types';

export const HandleWithTooltip = ({
    originHandle,
    originHandleProps,
    stateModifiers,
    tooltipFormat,
    className,
}: HandleWithTooltipProps) => {
    const autoVisible = stateModifiers['tooltip-display'] === 'auto';
    const alwaysVisible = stateModifiers['tooltip-display'] === 'on';
    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);

    if (alwaysVisible && !tooltipVisible) {
        setTooltipVisible(true);
    }

    //to show tooltip on mobile devices on touch
    if (autoVisible && !tooltipVisible && originHandleProps.dragging) {
        setTooltipVisible(true);
    }

    const styleProp = stateModifiers.rtl ? 'right' : 'left';
    const tooltipContent = tooltipFormat
        ? tooltipFormat(originHandleProps.value)
        : originHandleProps.value;

    const handleTooltipVisibility = ({
        currentHovered,
        currentFocused,
    }: {
        currentHovered?: boolean;
        currentFocused?: boolean;
    }) => {
        if (autoVisible) {
            const handleHovered = currentHovered === undefined ? hovered : currentHovered;
            const handleFocused = currentFocused === undefined ? focused : currentFocused;
            setTooltipVisible(handleHovered || handleFocused);
        }
    };

    const handle = alwaysVisible
        ? originHandle
        : React.cloneElement(originHandle, {
              onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => {
                  originHandle.props.onMouseEnter?.(event);
                  setHovered(true);
                  handleTooltipVisibility({currentHovered: true});
              },
              onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => {
                  originHandle.props.onMouseLeave?.(event);
                  setHovered(false);
                  handleTooltipVisibility({currentHovered: false});
              },
              onFocus: (event: React.FocusEvent<HTMLDivElement>) => {
                  originHandle.props.onFocus?.(event);
                  setFocused(true);
                  handleTooltipVisibility({currentFocused: true});
              },
              onBlur: (event: React.FocusEvent<HTMLDivElement>) => {
                  originHandle.props.onBlur?.(event);
                  setFocused(false);
                  handleTooltipVisibility({currentFocused: false});
              },
          });

    return (
        <React.Fragment>
            {handle}
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
        </React.Fragment>
    );
};
