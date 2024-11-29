import React from 'react';

import {
    safePolygon,
    useClick,
    useDismiss,
    useFloatingRootContext,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';

import {useControlledState, useForkRef} from '../../../hooks';
import {Popup} from '../../Popup';
import type {PopupProps} from '../../Popup';
import type {DOMProps, QAProps} from '../../types';
import {block} from '../../utils/cn';
import {getElementRef} from '../../utils/getElementRef';

export interface PopoverProps
    extends QAProps,
        DOMProps,
        Pick<
            PopupProps,
            | 'middlewares'
            | 'strategy'
            | 'placement'
            | 'offset'
            | 'keepMounted'
            | 'disablePortal'
            | 'hasArrow'
            | 'contentClassName'
            | 'disableEscapeKeyDown'
            | 'disableOutsideClick'
            | 'disableLayer'
        > {
    children: React.ReactElement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    content?: React.ReactNode;
    trigger?: 'hover' | 'click';
    delay?: number | {open?: number; close?: number};
    enableSafePolygon?: boolean;
}

const b = block('popover2');
const DEFAULT_DELAY = 500;

export function Popover({
    children,
    open,
    onOpenChange,
    disabled,
    content,
    trigger,
    delay = DEFAULT_DELAY,
    enableSafePolygon,
    className,
    contentClassName,
    ...restProps
}: PopoverProps) {
    const child = React.Children.only(children);
    const childRef = getElementRef(child);

    const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);
    const [floatingElement, setFloatingElement] = React.useState<HTMLDivElement | null>(null);
    const anchorRef = useForkRef(setAnchorElement, childRef);

    const [isOpen, setIsOpen] = useControlledState(open, false, onOpenChange);

    const context = useFloatingRootContext({
        open: isOpen,
        onOpenChange: setIsOpen,
        elements: {
            reference: anchorElement,
            floating: floatingElement,
        },
    });

    const hover = useHover(context, {
        enabled: !disabled && trigger !== 'click',
        delay:
            typeof delay === 'number'
                ? delay
                : {open: delay.open ?? DEFAULT_DELAY, close: delay.close ?? DEFAULT_DELAY},
        move: false,
        handleClose: enableSafePolygon ? safePolygon() : undefined,
    });
    const click = useClick(context, {enabled: !disabled && trigger !== 'hover'});
    const dismiss = useDismiss(context);
    const role = useRole(context, {role: 'dialog'});

    const {getReferenceProps, getFloatingProps} = useInteractions([hover, click, dismiss, role]);

    return (
        <React.Fragment>
            {React.cloneElement(child, {ref: anchorRef, ...getReferenceProps()})}
            <Popup
                {...restProps}
                ref={setFloatingElement}
                open={isOpen}
                floatingContext={context}
                floatingProps={getFloatingProps()}
                className={b(null, className)}
                contentClassName={b('content', contentClassName)}
            >
                {content}
            </Popup>
        </React.Fragment>
    );
}
