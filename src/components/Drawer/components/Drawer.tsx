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

import type {ModalProps} from 'src/components/Modal';

import {useForkRef} from '../../../hooks';
import {useFloatingTransition} from '../../../hooks/private/useFloatingTransition';
import {Portal} from '../../Portal';
import {block} from '../../utils/cn';
import {filterDOMProps} from '../../utils/filterDOMProps';
import {DRAWER_ANIMATION_DURATION_MS} from '../constants';
import type {DrawerPlacement, OnResizeHandler} from '../hooks/useResizeHandlers';
import i18n from '../i18n';

import {DrawerItem} from './DrawerItem';

import './Drawer.scss';

const b = block('drawer');

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
     * Specifies the side from which the drawer should slide in, `left` by default.
     * @default left
     */
    placement?: DrawerPlacement;
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
}

export const Drawer = ({
    open,
    onOpenChange,
    placement = 'left',
    children,
    contentClassName,
    resizable = false,
    size,
    minSize,
    maxSize,
    onResizeStart,
    onResizeEnd,
    onResize,
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
    keepMounted = false,
    container,
    ...restProps
}: DrawerProps) => {
    const floatingNodeId = useFloatingNodeId();

    const {refs, context} = useFloating({
        nodeId: floatingNodeId,
        open,
        onOpenChange,
    });
    const overlayRef = React.useRef(null);

    const {isMounted, status} = useFloatingTransition({
        context,
        duration: DRAWER_ANIMATION_DURATION_MS,
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
    });

    const dismiss = useDismiss(context, {
        enabled: !disableEscapeKeyDown || !disableOutsideClick,
        outsidePress: (event) => {
            if (disableOutsideClick) {
                return false;
            }

            const isOwnOutsideClick =
                (event.target as HTMLElement).closest(`.${b()}`) === overlayRef.current;

            if (!isOwnOutsideClick) {
                return false;
            }

            return true;
        },
        escapeKey: !disableEscapeKeyDown,
    });

    const role = useRole(context, {role: 'dialog'});
    const {getFloatingProps} = useInteractions([dismiss, role]);
    const handleFloatingRef = useForkRef<HTMLDivElement>(refs.setFloating, floatingRef);

    const portal =
        isMounted || keepMounted ? (
            <Portal container={container} disablePortal={disablePortal}>
                <FloatingOverlay
                    style={style}
                    ref={overlayRef}
                    className={b(
                        {
                            open,
                            placement,
                        },
                        className,
                    )}
                    data-qa={qa}
                    data-floating-ui-status={status}
                    lockScroll={!disableBodyScrollLock}
                >
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
                            open={open}
                            placement={placement}
                            className={contentClassName}
                            resizable={resizable}
                            size={size}
                            onResize={onResize}
                            onResizeStart={onResizeStart}
                            onResizeEnd={onResizeEnd}
                            minSize={minSize}
                            maxSize={maxSize}
                            overlayRef={overlayRef}
                            {...filterDOMProps(restProps, {labelable: true})}
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
