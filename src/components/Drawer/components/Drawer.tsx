import * as React from 'react';

import {
    FloatingFocusManager,
    FloatingNode,
    FloatingOverlay,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useInteractions,
    useRole,
} from '@floating-ui/react';
import type {OpenChangeReason} from '@floating-ui/react';

import type {ModalProps} from 'src/components/Modal';

import {useForkRef} from '../../../hooks';
import {useFloatingTransition} from '../../../hooks/private/useFloatingTransition';
import {Portal} from '../../Portal';
import {block} from '../../utils/cn';
import {DRAWER_ANIMATION_DURATION_MS} from '../constants';
import type {DrawerDirection, OnResizeHandler} from '../utils';

import {DrawerItem} from './DrawerItem';
import type {DrawerItemProps} from './DrawerItem';

import './Drawer.scss';

const b = block('drawer');

export type DrawerChild = React.ReactElement<DrawerItemProps>;

export interface DrawerProps
    extends Omit<
        ModalProps,
        | 'disableHeightTransition'
        | 'onClose'
        | 'onEscapeKeyDown'
        | 'onEnterKeyDown'
        | 'onOutsideClick'
    > {
    /**
     * Specifies the direction from which the drawer should slide in, `left` by default.
     * @default left
     */
    direction?: DrawerDirection;

    resizable?: boolean;

    size?: number;

    minSize?: number;

    maxSize?: number;

    onResizeStart?: OnResizeHandler;

    onResize?: OnResizeHandler;

    onResizeEnd?: OnResizeHandler;

    /** Optional additional class names to style the background veil element. */
    veilClassName?: string;

    /** Optional flag to hide the background darkening */
    hideVeil?: boolean;
}

export const Drawer = ({
    open,
    onOpenChange,
    direction = 'left',
    children,
    contentClassName,
    resizable,
    size,
    minSize,
    maxSize,
    onResizeStart,
    onResizeEnd,
    onResize,
    veilClassName,
    className,
    style,
    qa,
    disableEscapeKeyDown,
    disableOutsideClick,
    initialFocus,
    returnFocus,
    disableBodyScrollLock = false,
    disableVisuallyHiddenDismiss,
    onTransitionIn,
    onTransitionInComplete,
    onTransitionOut,
    onTransitionOutComplete,
    floatingRef,
    disablePortal,
    hideVeil,
    keepMounted = false,
    container,
}: DrawerProps) => {
    const floatingNodeId = useFloatingNodeId();

    const handleOpenChange = React.useCallback(
        (isOpen: boolean, event?: Event, reason?: OpenChangeReason) => {
            onOpenChange?.(isOpen, event, reason);
        },
        [onOpenChange],
    );

    const {refs, context} = useFloating({
        nodeId: floatingNodeId,
        open,
        onOpenChange: handleOpenChange,
    });

    const handleFloatingRef = useForkRef<HTMLDivElement>(refs.setFloating, floatingRef);

    const dismiss = useDismiss(context, {
        enabled: !disableOutsideClick || !disableEscapeKeyDown,
        outsidePress: !disableOutsideClick,
        escapeKey: !disableEscapeKeyDown,
    });

    const role = useRole(context, {role: 'dialog'});
    const {getFloatingProps} = useInteractions([dismiss, role]);

    const [isTransitionInProgress, setIsTransitionInProgress] = React.useState(false);

    const handleTransitionIn = React.useCallback(() => {
        setIsTransitionInProgress(true);
        onTransitionIn?.();
    }, [onTransitionIn]);
    const handleTransitionInComplete = React.useCallback(() => {
        setIsTransitionInProgress(false);
        onTransitionInComplete?.();
    }, [onTransitionInComplete]);
    const handleTransitionOut = React.useCallback(() => {
        setIsTransitionInProgress(true);
        onTransitionOut?.();
    }, [onTransitionOut]);
    const handleTransitionOutComplete = React.useCallback(() => {
        setIsTransitionInProgress(false);
        onTransitionOutComplete?.();
    }, [onTransitionOutComplete]);

    const {isMounted, status} = useFloatingTransition({
        context,
        duration: DRAWER_ANIMATION_DURATION_MS,
        onTransitionIn: handleTransitionIn,
        onTransitionInComplete: handleTransitionInComplete,
        onTransitionOut: handleTransitionOut,
        onTransitionOutComplete: handleTransitionOutComplete,
    });

    const veilRef = React.useRef<HTMLDivElement>(null);

    // const shouldApplyScrollLock = Boolean(scrollLock && open && hideVeil && usePortal);
    // useScrollLock(shouldApplyScrollLock);

    const currentStyle = React.useMemo(() => {
        const positionProp = {
            position: (disablePortal ? 'absolute' : 'fixed') as 'fixed' | 'absolute',
        };

        return {
            ...positionProp,
            ...style,
        };
    }, [style, disablePortal]);

    const portal =
        isMounted || keepMounted ? (
            <Portal container={container} disablePortal={disablePortal}>
                <FloatingOverlay
                    style={currentStyle}
                    className={b({open, hideVeil}, className)}
                    data-qa={qa}
                    data-floating-ui-status={status}
                    data-transiting={isTransitionInProgress}
                    lockScroll={!disableBodyScrollLock}
                >
                    <div ref={veilRef} className={b('veil', {hidden: hideVeil}, veilClassName)} />
                    <FloatingFocusManager
                        context={context}
                        disabled={!isMounted}
                        modal={isMounted}
                        initialFocus={initialFocus ?? refs.floating}
                        returnFocus={returnFocus}
                        visuallyHiddenDismiss={disableVisuallyHiddenDismiss ? false : 'Close'}
                        restoreFocus={true}
                    >
                        <DrawerItem
                            id="test"
                            ref={handleFloatingRef}
                            visible={open}
                            disablePortal={disablePortal}
                            direction={direction}
                            className={contentClassName}
                            resizable={resizable}
                            width={size}
                            onResize={onResize}
                            onResizeStart={onResizeStart}
                            onResizeEnd={onResizeEnd}
                            minResizeWidth={minSize}
                            maxResizeWidth={maxSize}
                            {...getFloatingProps()}
                        >
                            {children}
                        </DrawerItem>
                    </FloatingFocusManager>
                </FloatingOverlay>
            </Portal>
        ) : null;

    return <FloatingNode id={floatingNodeId}>{portal}</FloatingNode>;
};
