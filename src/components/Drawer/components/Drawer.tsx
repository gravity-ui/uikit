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

import {useControlledState, useForkRef} from '../../../hooks';
import {Portal} from '../../Portal';
import {block} from '../../utils/cn';
import {useDrawerFloating} from '../hooks/useDrawerFloating';
import type {DrawerDirection, OnResizeHandler} from '../hooks/useResizeHandlers';
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
     * Specifies the default open state of the component.
     * @default false
     */
    defaultOpen?: boolean;
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
    defaultOpen = false,
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
    ...restProps
}: DrawerProps) => {
    const [isOpen, setIsOpen] = useControlledState(open, defaultOpen ?? false, onOpenChange);
    const floatingNodeId = useFloatingNodeId();

    const {refs, context} = useFloating({
        nodeId: floatingNodeId,
        open: isOpen,
        onOpenChange: setIsOpen,
    });
    const overlayRef = React.useRef(null);

    const {isInitialRender, isMounted, status, isTransitionInProgress} = useDrawerFloating({
        onTransitionIn,
        onTransitionInComplete,
        onTransitionOut,
        onTransitionOutComplete,
        context,
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
                    aria-modal="true"
                    className={b(
                        {
                            open: isOpen,
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
                    <div className={b('veil', {hidden: hideVeil})} />
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
                            open={isOpen}
                            direction={direction}
                            className={contentClassName}
                            resizable={resizable}
                            size={size}
                            onResize={onResize}
                            onResizeStart={onResizeStart}
                            onResizeEnd={onResizeEnd}
                            minResizeWidth={minSize}
                            maxResizeWidth={maxSize}
                            {...getFloatingProps()}
                            {...restProps}
                        >
                            {children}
                        </DrawerItem>
                    </FloatingFocusManager>
                </FloatingOverlay>
            </Portal>
        ) : null;

    return <FloatingNode id={floatingNodeId}>{portal}</FloatingNode>;
};
