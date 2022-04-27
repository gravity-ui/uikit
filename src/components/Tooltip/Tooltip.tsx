import React, {Children, cloneElement, useCallback, useEffect, useState} from 'react';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

import {Popup, PopupPlacement} from '../Popup';
import {useBoolean} from '../utils/useBoolean';
import {block} from '../utils/cn';

import './Tooltip.scss';

export interface TooltipProps extends TooltipDelayProps {
    content?: React.ReactNode;
    placement?: PopupPlacement;
    children: React.ReactElement;
}

interface TooltipDelayProps {
    openDelay?: number;
    closeDelay?: number;
}

const b = block('tooltip');
const DEFAULT_PLACEMENT: PopupPlacement = ['bottom', 'top'];

export const Tooltip = (props: TooltipProps) => {
    const {children, content, placement = DEFAULT_PLACEMENT} = props;
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
    const tooltipVisible = useTooltipVisible(anchorElement, props);

    const child = Children.only(children);
    const childRef = (child as any).ref;

    const elementRef = useCallback(
        (node: HTMLElement | null) => {
            setAnchorElement(node);

            if (isFunction(node)) {
                childRef(node);
            } else if (isObject()) {
                childRef.current = node;
            }
        },
        [childRef],
    );

    const renderPopup = () => {
        return (
            <Popup
                className={b()}
                open={tooltipVisible}
                placement={placement}
                anchorRef={{current: anchorElement}}
                disableEscapeKeyDown
                disableOutsideClick
                disableLayer
            >
                <div className={b('content')}>{content}</div>
            </Popup>
        );
    };

    return (
        <>
            {cloneElement(child, {ref: elementRef})}
            {renderPopup()}
        </>
    );
};

function useTooltipVisible(anchor: HTMLElement | null, {openDelay, closeDelay}: TooltipDelayProps) {
    const anchorHovered = useAnchorHovered(anchor);
    const [tooltipVisible, showTooltip, hideTooltip] = useBoolean(false);
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (anchorHovered && !tooltipVisible) timeout = setTimeout(showTooltip, openDelay);
        if (!anchorHovered && tooltipVisible) timeout = setTimeout(hideTooltip, closeDelay);
        return () => {
            clearTimeout(timeout);
        };
    }, [anchorHovered]);
    return tooltipVisible;
}

function useAnchorHovered(anchor: HTMLElement | null) {
    const [hovered, setHovered, unsetHovered] = useBoolean(false);
    useEffect(() => {
        if (!anchor) return;
        anchor.addEventListener('mouseenter', setHovered);
        anchor.addEventListener('mouseleave', unsetHovered);
        return () => {
            anchor.removeEventListener('mouseenter', setHovered);
            anchor.removeEventListener('mouseleave', unsetHovered);
        };
    }, [anchor, setHovered, unsetHovered]);
    return hovered;
}
