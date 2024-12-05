import React from 'react';

import {
    safePolygon,
    useClick,
    useFloatingRootContext,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type {UseInteractionsReturn} from '@floating-ui/react';

import {useControlledState, useForkRef} from '../../../hooks';
import {Popup} from '../../Popup';
import type {PopupProps} from '../../Popup';
import type {DOMProps, QAProps} from '../../types';
import {block} from '../../utils/cn';
import {getElementRef} from '../../utils/getElementRef';

export interface PopoverProps
    extends QAProps,
        DOMProps,
        Pick<PopupProps, 'strategy' | 'placement' | 'offset' | 'keepMounted' | 'hasArrow'> {
    children:
        | ((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => React.ReactElement)
        | React.ReactElement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    content?: React.ReactNode;
    trigger?: 'click';
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
    ...restProps
}: PopoverProps) {
    const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null);
    const [floatingElement, setFloatingElement] = React.useState<HTMLDivElement | null>(null);
    const [getAnchorProps, setGetAnchorProps] =
        React.useState<UseInteractionsReturn['getReferenceProps']>();

    const handleSetGetAnchorProps = React.useCallback<NonNullable<PopupProps['setGetAnchorProps']>>(
        (getAnchorPropsFn) => {
            setGetAnchorProps(() => getAnchorPropsFn);
        },
        [],
    );

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
    const click = useClick(context, {enabled: !disabled});
    const role = useRole(context, {role: 'dialog'});

    const {getReferenceProps, getFloatingProps} = useInteractions([hover, click, role]);

    const anchorRef = useForkRef(
        setAnchorElement,
        React.isValidElement(children) ? getElementRef(children) : undefined,
    );
    const anchorProps = React.isValidElement<any>(children)
        ? getReferenceProps(getAnchorProps?.(children.props) ?? children.props)
        : getReferenceProps(getAnchorProps?.());
    const anchorNode = React.isValidElement<any>(children)
        ? React.cloneElement(children, {
              ref: anchorRef,
              ...anchorProps,
          })
        : children(anchorProps, anchorRef);

    return (
        <React.Fragment>
            {anchorNode}
            <Popup
                {...restProps}
                open={isOpen}
                setGetAnchorProps={handleSetGetAnchorProps}
                floatingContext={context}
                floatingRef={setFloatingElement}
                floatingProps={getFloatingProps()}
                className={b(null, className)}
            >
                {content}
            </Popup>
        </React.Fragment>
    );
}
