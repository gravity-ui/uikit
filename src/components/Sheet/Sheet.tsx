'use client';

import * as React from 'react';

import {
    FloatingNode,
    FloatingOverlay,
    FloatingTree,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type {OpenChangeReason} from '@floating-ui/react';

import {Portal} from '../Portal/Portal';
import type {PortalProps} from '../Portal/Portal';
import {useDefaultProps} from '../theme/useDefaultProps';
import type {QAProps} from '../types';
import {useLayer} from '../utils/layer-manager';

import {SheetContentContainer} from './SheetContent';
import {sheetBlock} from './constants';
import {useSheetDismiss} from './hooks/useSheetDismiss';

import './Sheet.scss';

export type SheetOpenChangeReason = OpenChangeReason | 'swipe' | 'navigation';

export interface SheetProps extends Pick<PortalProps, 'container' | 'disablePortal'>, QAProps {
    children?: React.ReactNode;
    /** @deprecated Use onOpenChange instead */
    onClose?: () => void;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: SheetOpenChangeReason) => void;
    /** Show/hide sheet */
    visible: boolean;
    /** ID of the sheet, used as hash in URL. It's important to specify different `id` values if there can be more than one sheet on the page */
    id?: string;
    /** Title of the sheet window */
    title?: string;
    /** Class name for the sheet window */
    className?: string;
    /** Class name for the sheet content */
    contentClassName?: string;
    /** Class name for the swipe area */
    swipeAreaClassName?: string;
    /** Enable the behavior in which you can close the sheet window with a swipe down if the content is scrolled to its top (`contentNode.scrollTop === 0`) or has no scroll at all */
    allowHideOnContentScroll?: boolean;
    /** Hide top bar with resize handle */
    hideTopBar?: boolean;
    /** Coefficient that determines the maximum height of the `Sheet` relative to the height of the viewport (range 0-1) */
    maxContentHeightCoefficient?: number;
    /** `Sheet` height will always have the maximum value */
    alwaysFullHeight?: boolean;
}

function SheetComponent(rawProps: SheetProps) {
    const {
        children,
        onClose,
        onOpenChange,
        visible,
        id,
        title,
        className,
        contentClassName,
        swipeAreaClassName,
        allowHideOnContentScroll,
        hideTopBar,
        maxContentHeightCoefficient,
        alwaysFullHeight,
        container,
        disablePortal,
        qa,
    } = useDefaultProps('Sheet', rawProps);
    const {requestedOpen, requestDismiss} = useSheetDismiss({visible, onOpenChange});
    const [open, setOpen] = React.useState(requestedOpen);
    const veilRef = React.useRef<HTMLDivElement>(null);
    const isAnimatingRef = React.useRef(false);

    React.useEffect(() => {
        if (requestedOpen) {
            setOpen(true);
        }
    }, [requestedOpen]);

    const handleEscapeKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            requestDismiss({reason: 'escape-key', event});
        },
        [requestDismiss],
    );

    useLayer({
        open: requestedOpen,
        type: 'sheet',
        disableOutsideClick: true,
        onEscapeKeyDown: handleEscapeKeyDown,
    });

    const floatingNodeId = useFloatingNodeId();
    const {refs, context} = useFloating({
        nodeId: floatingNodeId,
        open: requestedOpen,
    });
    const role = useRole(context, {role: 'dialog'});
    const {getFloatingProps} = useInteractions([role]);

    const hideSheet = () => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    if (!open) {
        return <FloatingNode id={floatingNodeId} />;
    }

    return (
        <FloatingNode id={floatingNodeId}>
            <Portal container={container} disablePortal={disablePortal}>
                <FloatingOverlay
                    data-qa={qa}
                    className={sheetBlock({'without-top-bar': hideTopBar}, className)}
                    lockScroll={open}
                    style={{overflow: undefined}}
                >
                    <SheetContentContainer
                        id={id}
                        content={children}
                        contentClassName={contentClassName}
                        swipeAreaClassName={swipeAreaClassName}
                        title={title}
                        visible={requestedOpen}
                        allowHideOnContentScroll={allowHideOnContentScroll}
                        hideTopBar={hideTopBar}
                        onExitComplete={hideSheet}
                        requestDismiss={requestDismiss}
                        veilRef={veilRef}
                        isAnimatingRef={isAnimatingRef}
                        floatingRef={refs.setFloating}
                        getFloatingProps={getFloatingProps}
                        maxContentHeightCoefficient={maxContentHeightCoefficient}
                        alwaysFullHeight={alwaysFullHeight}
                    />
                </FloatingOverlay>
            </Portal>
        </FloatingNode>
    );
}

export function Sheet(props: SheetProps) {
    const parentId = useFloatingParentNodeId();

    if (parentId === null) {
        return (
            <FloatingTree>
                <SheetComponent {...props} />
            </FloatingTree>
        );
    }

    return <SheetComponent {...props} />;
}
