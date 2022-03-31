import React, {Children, cloneElement, useCallback, useEffect, useState} from 'react';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

import {Popup, PopupPlacement} from '../Popup';
import {block} from '../utils/cn';

import './Tooltip.scss';

export interface TooltipProps {
    text: React.ReactNode;
    placement?: PopupPlacement;
    children: React.ReactElement;
}

const b = block('tooltip');

export const Tooltip = ({children, text, placement}: TooltipProps) => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

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

    useEffect(() => {
        if (!anchorElement) return;

        const onMouseEnter = () => {
            setPopupVisible(true);
        };

        const onMouseLeave = () => {
            setPopupVisible(false);
        };

        anchorElement.addEventListener('mouseenter', onMouseEnter);
        anchorElement.addEventListener('mouseleave', onMouseLeave);

        return () => {
            anchorElement.removeEventListener('mouseenter', onMouseEnter);
            anchorElement.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [anchorElement]);

    const renderPopup = () => {
        if (!popupVisible) {
            return null;
        }

        return (
            <Popup
                className={b()}
                open
                placement={placement}
                anchorRef={{current: anchorElement}}
                disableEscapeKeyDown
                disableOutsideClick
                disableLayer
            >
                <div className={b('text')}>{text}</div>
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
