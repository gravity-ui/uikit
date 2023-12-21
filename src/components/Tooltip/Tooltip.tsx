import React from 'react';

import {useForkRef} from '../../hooks';
import {type TooltipDelayProps, useTooltipVisible} from '../../hooks/private';
import {Popup} from '../Popup';
import type {PopupPlacement} from '../Popup';
import {Text} from '../Text';
import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './Tooltip.scss';

export interface TooltipProps extends QAProps, DOMProps, TooltipDelayProps {
    id?: string;
    disabled?: boolean;
    content?: string;
    placement?: PopupPlacement;
    children: React.ReactElement;
    contentClassName?: string;
    disablePortal?: boolean;
}

const b = block('tooltip');
const DEFAULT_PLACEMENT: PopupPlacement = ['bottom', 'top'];

export const Tooltip = (props: TooltipProps) => {
    const {
        children,
        content,
        disabled,
        placement = DEFAULT_PLACEMENT,
        qa,
        id,
        className,
        style,
        disablePortal,
        contentClassName,
        openDelay = 1000,
        closeDelay,
    } = props;

    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const tooltipVisible = useTooltipVisible(anchorElement, {
        openDelay,
        closeDelay,
        preventTriggerOnFocus: true,
    });

    const renderPopup = () => {
        return (
            <Popup
                id={id}
                role="tooltip"
                className={b(null, className)}
                style={style}
                open={tooltipVisible && !disabled}
                placement={placement}
                anchorRef={{current: anchorElement}}
                disablePortal={disablePortal}
                disableEscapeKeyDown
                disableOutsideClick
                disableLayer
                qa={qa}
            >
                <div className={b('content', contentClassName)}>
                    <Text variant="body-short" color="complementary">
                        {content}
                    </Text>
                </div>
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
