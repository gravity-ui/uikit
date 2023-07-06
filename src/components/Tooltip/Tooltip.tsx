import React from 'react';

import {Popup} from '../Popup';
import type {PopupPlacement} from '../Popup';
import type {DOMProps} from '../types';
import {block} from '../utils/cn';
import {useBoolean} from '../utils/useBoolean';
import {useForkRef} from '../utils/useForkRef';

import './Tooltip.scss';

export interface TooltipProps extends DOMProps, TooltipDelayProps {
    id?: string;
    disabled?: boolean;
    content?: React.ReactNode;
    placement?: PopupPlacement;
    children: React.ReactElement;
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
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const tooltipVisible = useTooltipVisible(anchorElement, props);

    const renderPopup = () => {
        return (
            <Popup
                id={props.id}
                role="tooltip"
                className={b(null, props.className)}
                style={props.style}
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

    const child = React.Children.only(children);
    const childRef = (child as any).ref;

    const ref = useForkRef(setAnchorElement, childRef);

    return (
        <React.Fragment>
            {React.cloneElement(child, {ref})}
            {anchorElement ? renderPopup() : null}
        </React.Fragment>
    );
};

function useTooltipVisible(anchor: HTMLElement | null, {openDelay, closeDelay}: TooltipDelayProps) {
    const [tooltipVisible, showTooltip, hideTooltip] = useBoolean(false);
    const timeoutRef = React.useRef<number>();
    const isFocusWithinRef = React.useRef(false);

    React.useEffect(() => {
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

        function handleFocusWithin(e: FocusEvent) {
            if (!isFocusWithinRef.current && document.activeElement === e.target) {
                isFocusWithinRef.current = true;
                clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(showTooltip, openDelay);
            }
        }

        function handleBlurWithin(e: FocusEvent) {
            if (
                isFocusWithinRef.current &&
                !(e.currentTarget as Element).contains(e.relatedTarget as Element)
            ) {
                isFocusWithinRef.current = false;
                clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(() => {
                    hideTooltip();
                }, closeDelay);
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                clearTimeout(timeoutRef.current);
                hideTooltip();
            }
        }

        anchor.addEventListener('mouseenter', handleHover);
        anchor.addEventListener('mouseleave', handleBlur);
        anchor.addEventListener('focus', handleFocusWithin);
        anchor.addEventListener('blur', handleBlurWithin);
        anchor.addEventListener('keydown', handleKeyDown);
        return () => {
            anchor.removeEventListener('mouseenter', handleHover);
            anchor.removeEventListener('mouseleave', handleBlur);
            anchor.removeEventListener('focus', handleFocusWithin);
            anchor.removeEventListener('blur', handleBlurWithin);
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [anchor, showTooltip, hideTooltip, openDelay, closeDelay]);

    return tooltipVisible;
}
