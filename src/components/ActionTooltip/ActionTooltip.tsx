import React from 'react';

import {useForkRef} from '../../hooks';
import {type TooltipDelayProps, useTooltipVisible} from '../../hooks/private';
import {Hotkey, type HotkeyProps} from '../Hotkey';
import {Popup, type PopupPlacement} from '../Popup';
import type {DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';

import './ActionTooltip.scss';

export interface ActionTooltipProps extends QAProps, DOMProps, TooltipDelayProps {
    id?: string;
    disablePortal?: boolean;
    contentClassName?: string;
    disabled?: boolean;
    placement?: PopupPlacement;
    children: React.ReactElement;
    title: string;
    hotkey?: HotkeyProps['value'];
    description?: React.ReactNode;
}

const DEFAULT_PLACEMENT: PopupPlacement = ['bottom', 'top'];
const b = block('action-tooltip');

export function ActionTooltip(props: ActionTooltipProps) {
    const {
        placement = DEFAULT_PLACEMENT,
        title,
        hotkey,
        children,
        className,
        contentClassName,
        description,
        disabled = false,
        style,
        qa,
        id,
        disablePortal,
        ...delayProps
    } = props;

    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const tooltipVisible = useTooltipVisible(anchorElement, delayProps);

    const renderPopup = () => {
        return (
            <Popup
                id={id}
                disablePortal={disablePortal}
                role="tooltip"
                className={b(null, className)}
                style={style}
                open={tooltipVisible && !disabled}
                placement={placement}
                anchorRef={{current: anchorElement}}
                disableEscapeKeyDown
                disableOutsideClick
                disableLayer
                qa={qa}
            >
                <div className={b('content', contentClassName)}>
                    <div className={b('heading')}>
                        <div className={b('title')}>{title}</div>
                        {hotkey && <Hotkey view="dark" value={hotkey} className={b('hotkey')} />}
                    </div>
                    {description && <div className={b('description')}>{description}</div>}
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
}
