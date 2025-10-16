'use client';

import * as React from 'react';

import {
    autoUpdate,
    limitShift,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type {OpenChangeReason, Strategy} from '@floating-ui/react';

import {useControlledState, useForkRef} from '../../hooks';
import type {PopupOffset, PopupPlacement} from '../Popup';
import {OVERFLOW_PADDING} from '../Popup/constants';
import {getPlacementOptions} from '../Popup/utils';
import {Portal} from '../Portal';
import type {PortalProps} from '../Portal';
import type {AriaLabelingProps, DOMProps, QAProps} from '../types';
import {block} from '../utils/cn';
import {filterDOMProps} from '../utils/filterDOMProps';
import {getElementRef} from '../utils/getElementRef';

import './Tooltip.scss';

export interface TooltipProps
    extends Pick<PortalProps, 'container' | 'disablePortal'>,
        AriaLabelingProps,
        QAProps,
        DOMProps {
    /** Anchor node */
    children:
        | ((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => React.ReactElement)
        | React.ReactElement;
    /** Controls open state */
    open?: boolean;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    /** Floating UI strategy */
    strategy?: Strategy;
    /** Floating element placement */
    placement?: PopupPlacement;
    /** Floating element offset relative to anchor */
    offset?: PopupOffset;
    /** Disabled state */
    disabled?: boolean;
    /** Floating element content */
    content?: React.ReactNode;
    /** Event that should trigger opening */
    trigger?: 'focus';
    /** Role applied to the floating element */
    role?: 'tooltip' | 'label';
    /** Delay in ms before open */
    openDelay?: number;
    /** Delay in ms before close */
    closeDelay?: number;
}

const b = block('tooltip');
const DEFAULT_OPEN_DELAY = 1000;
const DEFAULT_CLOSE_DELAY = 0;
const DEFAULT_PLACEMENT: PopupPlacement = 'bottom';
const DEFAULT_OFFSET = 4;

export function Tooltip({
    children,
    open,
    onOpenChange,
    strategy,
    placement: placementProp = DEFAULT_PLACEMENT,
    offset: offsetProp = DEFAULT_OFFSET,
    disabled,
    content,
    trigger,
    role: roleProp = 'tooltip',
    openDelay = DEFAULT_OPEN_DELAY,
    closeDelay = DEFAULT_CLOSE_DELAY,
    container,
    disablePortal,
    className,
    style,
    qa,
    ...restProps
}: TooltipProps) {
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const {placement, middleware: placementMiddleware} = getPlacementOptions(placementProp, false);

    const [isOpen, setIsOpen] = useControlledState(open, false, onOpenChange);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        strategy,
        placement,
        middleware: [
            offset(offsetProp),
            shift({
                padding: OVERFLOW_PADDING,
                limiter: limitShift(),
            }),
            placementMiddleware,
        ],
        whileElementsMounted: autoUpdate,
        elements: {
            reference: anchorElement,
        },
    });

    const hover = useHover(context, {
        enabled: trigger !== 'focus',
        delay: {open: openDelay, close: closeDelay},
        move: false,
    });
    const focus = useFocus(context);
    const role = useRole(context, {
        role: roleProp,
    });
    const dismiss = useDismiss(context, {
        outsidePress: false,
        ancestorScroll: true,
    });

    const {getReferenceProps, getFloatingProps} = useInteractions([hover, focus, role, dismiss]);

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
            {isOpen && !disabled ? (
                <Portal container={container} disablePortal={disablePortal}>
                    <div
                        ref={refs.setFloating}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 10000,
                            width: 'max-content',
                            ...floatingStyles,
                        }}
                        {...getFloatingProps()}
                    >
                        <div
                            className={b(null, className)}
                            style={style}
                            data-qa={qa}
                            {...filterDOMProps(restProps, {labelable: true})}
                        >
                            {content}
                        </div>
                    </div>
                </Portal>
            ) : null}
        </React.Fragment>
    );
}
