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
import type {FloatingFocusManagerProps, OpenChangeReason} from '@floating-ui/react';

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

export interface DrawerProps {
    open?: boolean;

    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;

    /**
     * Specifies the direction from which the drawer should slide in, `left` by default.
     * @default left
     */
    direction?: DrawerDirection;

    /** Content to be displayed within the drawer item, preferable over the deprecated `content`. */
    children?: React.ReactNode;

    contentClassName?: string;

    resizable?: boolean;

    size?: number;

    minSize?: number;

    maxSize?: number;

    onResizeStart?: OnResizeHandler;

    onResize?: OnResizeHandler;

    onResizeEnd?: OnResizeHandler;

    /** Optional additional class names to style the background veil element. */
    veilClassName?: string;

    /** `data-qa` HTML attribute, used for testing. */
    qa?: string;

    /** Optional additional class names to style the drawer component. */
    className?: string;

    /** Optional inline styles to be applied to the drawer component. */
    style?: React.CSSProperties;

    /** Do not dismiss on escape key press */
    disableEscapeKeyDown?: boolean;

    /** Do not dismiss on outside click */
    disableOutsideClick?: boolean;

    disableBodyScrollLock?: boolean;

    /**
     * FloatingFocusManager `initialFocus` property
     */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /**
     * FloatingFocusManager `returnFocus` property
     */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];

    /** Do not add a11y dismiss buttons when managing focus */
    disableVisuallyHiddenDismiss?: boolean;

    /** Callback called when `Modal` is opened and "in" transition is started */
    onTransitionIn?: () => void;
    /** Callback called when `Modal` is opened and "in" transition is completed */
    onTransitionInComplete?: () => void;
    /** Callback called when `Modal` is closed and "out" transition is started */
    onTransitionOut?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is completed */
    onTransitionOutComplete?: () => void;

    floatingRef?: React.RefObject<HTMLDivElement>;

    disablePortal?: boolean;

    /**
     * Keep child components mounted when closed
     * @default false
     */
    keepMounted?: boolean;

    /** Optional flag to hide the background darkening */
    hideVeil?: boolean;

    container?: HTMLElement;
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
    disableBodyScrollLock,
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

    const portal =
        isMounted || keepMounted ? (
            <Portal container={container} disablePortal={disablePortal}>
                <FloatingOverlay
                    style={style}
                    className={b({open, hideVeil}, className)}
                    data-qa={qa}
                    data-floating-ui-status={status}
                    data-transiting={isTransitionInProgress}
                    lockScroll={!disableBodyScrollLock}
                >
                    <div
                        ref={veilRef}
                        className={b('veil', {hidden: hideVeil}, veilClassName)}
                        role="presentation"
                    />
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
                            keepMounted={keepMounted}
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
