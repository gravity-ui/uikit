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
import {Portal} from '../../Portal';
import {block} from '../../utils/cn';
import i18n from '../i18n';
import {useDrawerFloating} from '../utils';
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
        | 'contentOverflow'
    > {
    /**
     * Specifies the direction from which the drawer should slide in, `left` by default.
     * @default left
     */
    direction?: DrawerDirection;
    /**
     * Enables resizing of the drawer via pointer.
     * @default false
     */
    resizable?: boolean;
    /**
     * Width of the drawer in pixels.
     */
    size?: number;
    /**
     * Min width of the drawer in pixels.
     */
    minSize?: number;
    /**
     * Max width of the drawer in pixels.
     */
    maxSize?: number;
    /**
     * Callback called at the start of resizing.
     */
    onResizeStart?: OnResizeHandler;
    /**
     * Callback called when the drawer is being resized.
     */
    onResize?: OnResizeHandler;
    /**
     * Callback called at the end of resizing.
     */
    onResizeEnd?: OnResizeHandler;
    /** Optional additional class names to style the background veil element. */
    veilClassName?: string;
    /** Optional flag to hide the background darkening */
    hideVeil?: boolean;
    /**
     * Option that enables first opening animation if the Drawer is being rendered with open state.
     * @default false
     */
    showInitialAnimation?: boolean;
}

export const Drawer = ({
    open,
    onOpenChange,
    direction = 'left',
    children,
    contentClassName,
    resizable = false,
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
    showInitialAnimation = false,
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

    const {isInitialRender, isMounted, status, isTransitionInProgress} = useDrawerFloating({
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
        context,
    });

    const dismiss = useDismiss(context, {
        enabled: !disableEscapeKeyDown,
        outsidePress: false,
        escapeKey: !disableEscapeKeyDown,
    });

    const role = useRole(context, {role: 'dialog'});
    const {getFloatingProps} = useInteractions([dismiss, role]);
    const veilRef = React.useRef<HTMLDivElement>(null);
    const handleFloatingRef = useForkRef<HTMLDivElement>(refs.setFloating, floatingRef);

    const handleVeilClick = React.useCallback(() => {
        if (disableOutsideClick) {
            return;
        }

        onOpenChange?.(false);
    }, [disableOutsideClick, onOpenChange]);

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
                    aria-modal="true"
                    className={b(
                        {
                            open,
                            'hide-veil': hideVeil,
                            'skip-animation': !showInitialAnimation && isInitialRender,
                        },
                        className,
                    )}
                    data-qa={qa}
                    data-floating-ui-status={status}
                    data-transiting={isTransitionInProgress}
                    lockScroll={!disableBodyScrollLock}
                >
                    <div
                        ref={veilRef}
                        className={b('veil', {hidden: hideVeil}, veilClassName)}
                        role="presentation"
                        onClick={handleVeilClick}
                    />
                    <FloatingFocusManager
                        context={context}
                        disabled={!isMounted}
                        modal={isMounted}
                        initialFocus={initialFocus ?? refs.floating}
                        returnFocus={returnFocus}
                        visuallyHiddenDismiss={disableVisuallyHiddenDismiss ? false : i18n('close')}
                        restoreFocus={true}
                    >
                        <DrawerItem
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
