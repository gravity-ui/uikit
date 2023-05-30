import React, {Children, cloneElement, useEffect, useState} from 'react';

import {Popup, PopupPlacement} from '../Popup';
import {block} from '../utils/cn';
import {useBoolean} from '../utils/useBoolean';
import {useForkRef} from '../utils/useForkRef';

import './Tooltip.scss';

export interface TooltipProps extends TooltipDelayProps {
    disabled?: boolean;
    content?: React.ReactNode;
    placement?: PopupPlacement;
    children: React.ReactElement;
    className?: string;
    contentClassName?: string;
}

interface TooltipDelayProps {
    openDelay?: number;
    closeDelay?: number;
}

const b = block('tooltip');
const DEFAULT_PLACEMENT: PopupPlacement = ['bottom', 'top'];

export const Tooltip = (props: TooltipProps) => {
    const {children, content, disabled, placement = DEFAULT_PLACEMENT} = props;
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
    const tooltipVisible = useTooltipVisible(anchorElement, props);

    const renderPopup = () => {
        return (
            <Popup
                className={b(null, props.className)}
                open={tooltipVisible && !disabled}
                placement={placement}
                anchorRef={{current: anchorElement}}
                disableEscapeKeyDown
                disableOutsideClick
                disableLayer
            >
                <div className={b('content', props.contentClassName)}>{content}</div>
            </Popup>
        );
    };

    const child = Children.only(children);
    const childRef = (child as any).ref;

    const ref = useForkRef(setAnchorElement, childRef);

    return (
        <>
            {cloneElement(child, {ref})}
            {anchorElement ? renderPopup() : null}
        </>
    );
};

function useTooltipVisible(anchor: HTMLElement | null, {openDelay, closeDelay}: TooltipDelayProps) {
    const [tooltipVisible, showTooltip, hideTooltip] = useBoolean(false);
    const timeoutRef = React.useRef<number>();

    useEffect(() => {
        if (!anchor) {
            return undefined;
        }

        function handleHover() {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(showTooltip, openDelay);
        }

        function handleBlur() {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(hideTooltip, closeDelay);
        }

        anchor.addEventListener('mouseenter', handleHover);
        anchor.addEventListener('mouseleave', handleBlur);
        return () => {
            anchor.removeEventListener('mouseenter', handleHover);
            anchor.removeEventListener('mouseleave', handleBlur);
        };
    }, [anchor, showTooltip, hideTooltip, openDelay, closeDelay]);

    return tooltipVisible;
}
