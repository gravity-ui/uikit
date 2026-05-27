'use client';

import * as React from 'react';

import {
    safePolygon,
    useClick,
    useDismiss,
    useFloatingRootContext,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';

import {useControlledState, useForkRef} from '../../hooks';
import {Popup} from '../Popup';
import type {PopupProps} from '../Popup';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {getElementRef} from '../utils/getElementRef';

export interface PopoverProps
    extends AriaLabelingProps,
        QAProps,
        DOMProps,
        Pick<
            PopupProps,
            | 'container'
            | 'disablePortal'
            | 'open'
            | 'onOpenChange'
            | 'strategy'
            | 'placement'
            | 'offset'
            | 'keepMounted'
            | 'hasArrow'
            | 'modal'
            | 'initialFocus'
            | 'returnFocus'
            | 'disableVisuallyHiddenDismiss'
            | 'zIndex'
        > {
    children:
        | ((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => React.ReactElement)
        | React.ReactElement;
    disabled?: boolean;
    content?: React.ReactNode;
    trigger?: 'click';
    openDelay?: number;
    closeDelay?: number;
    enableSafePolygon?: boolean;
}

const b = block('popover');
const DEFAULT_OPEN_DELAY = 500;
const DEFAULT_CLOSE_DELAY = 250;

export function Popover({
    children,
    open,
    onOpenChange,
    disabled,
    content,
    trigger,
    openDelay = DEFAULT_OPEN_DELAY,
    closeDelay = DEFAULT_CLOSE_DELAY,
    enableSafePolygon,
    className,
    ...restProps
}: PopoverProps) {
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const [floatingElement, setFloatingElement] = React.useState<HTMLDivElement | null>(null);

    const [isOpen, setIsOpen] = useControlledState(open, false, onOpenChange);

    const context = useFloatingRootContext({
        open: isOpen && !disabled,
        onOpenChange: setIsOpen,
        elements: {
            reference: anchorElement,
            floating: floatingElement,
        },
    });

    const isHoverEnabled = trigger !== 'click';

    const hover = useHover(context, {
        enabled: isHoverEnabled,
        delay: {open: openDelay, close: closeDelay},
        move: false,
        handleClose: enableSafePolygon ? safePolygon() : undefined,
    });
    const click = useClick(context, {
        ignoreMouse: isHoverEnabled,
    });
    const role = useRole(context, {
        role: 'dialog',
    });
    const dismiss = useDismiss(context);

    const interactions = [hover, click, role, dismiss];
    const {getReferenceProps} = useInteractions(interactions);

    const anchorRef = useForkRef(
        setAnchorElement,
        React.isValidElement(children) ? getElementRef(children) : undefined,
    );
    const anchorProps = React.isValidElement<any>(children)
        ? getReferenceProps(children.props)
        : getReferenceProps();
    const anchorNode = React.isValidElement<any>(children)
        ? React.cloneElement(children, {
              ...anchorProps,
              ref: anchorRef,
          })
        : children(anchorProps, anchorRef);

    return (
        <React.Fragment>
            {anchorNode}
            <Popup
                {...restProps}
                open={context.open}
                floatingContext={context}
                floatingRef={setFloatingElement}
                floatingInteractions={interactions}
                className={b(null, className)}
            >
                {content}
            </Popup>
        </React.Fragment>
    );
}
