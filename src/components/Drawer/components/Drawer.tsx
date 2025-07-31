import * as React from 'react';

import {FloatingOverlay} from '@floating-ui/react';
import {CSSTransition, Transition} from 'react-transition-group';

import {Portal} from '../../Portal';
import {block} from '../../utils/cn';
import {DRAWER_ANIMATION_DURATION_MS} from '../constants';
import {useScrollLock} from '../utils';
import type {DrawerDirection, OnResizeHandler} from '../utils';

import {DrawerItem} from './DrawerItem';
import type {DrawerItemProps} from './DrawerItem';

import './Drawer.scss';

const b = block('drawer');

export type DrawerChild = React.ReactElement<DrawerItemProps>;

export interface DrawerProps {
    open?: boolean;

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

    ///////////////////////
    /////////// ModalProps
    ///////////////////////

    /** Optional additional class names to style the drawer component. */
    className?: string;

    /** Optional inline styles to be applied to the drawer component. */
    style?: React.CSSProperties;

    /** Optional additional class names to style the background veil element. */
    veilClassName?: string;

    /** Optional callback function that is called when the veil (overlay) is clicked. */
    onVeilClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;

    /** Optional callback function that is called when the escape key is pressed if the drawer is open. */
    onEscape?: (event: KeyboardEvent) => void;

    /** Optional flag to hide the background darkening */
    hideVeil?: boolean;

    /**
     * Optional flag to use `Portal` for drawer
     * @default false
     */
    usePortal?: boolean;

    /**
     * Keep child components mounted when closed
     * @default false
     */
    keepMounted?: boolean;

    /**
     * Whether to lock page scroll when drawer is open.
     * Applied only when hideVeil=true and usePortal=true.
     * @default false
     */
    scrollLock?: boolean;

    /** `data-qa` HTML attribute, used for testing. */
    qa?: string;
}

export const Drawer = ({
    open,
    direction = 'left',
    children,
    contentClassName,
    resizable,
    size,
    minSize,
    maxSize,
    onResizeStart,
    onResize,
    ///////////////////////
    /////////// ModalProps
    ///////////////////////
    className,
    veilClassName,
    style,
    onVeilClick,
    onEscape,
    hideVeil,
    usePortal = false,
    keepMounted = false,
    scrollLock = false,
    qa,
}: DrawerProps) => {
    React.useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onEscape?.(event);
            }
        };
        if (open) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onEscape, open]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const veilRef = React.useRef<HTMLDivElement>(null);

    const shouldApplyScrollLock = Boolean(scrollLock && open && hideVeil && usePortal);
    useScrollLock(shouldApplyScrollLock);

    return (
        <Transition
            in={open}
            timeout={{enter: 0, exit: DRAWER_ANIMATION_DURATION_MS}}
            mountOnEnter={!keepMounted}
            unmountOnExit={!keepMounted}
            nodeRef={containerRef}
        >
            {(state) => {
                const childrenVisible = open && state === 'entered';

                const content = (
                    <div
                        ref={containerRef}
                        className={b({hideVeil}, className)}
                        style={style}
                        data-qa={qa}
                    >
                        <CSSTransition
                            in={childrenVisible}
                            timeout={DRAWER_ANIMATION_DURATION_MS}
                            unmountOnExit
                            classNames={b('veil-transition')}
                            nodeRef={veilRef}
                        >
                            <div
                                ref={veilRef}
                                className={b('veil', {hidden: hideVeil}, veilClassName)}
                                onClick={onVeilClick}
                                role="presentation"
                            />
                        </CSSTransition>
                        <DrawerItem
                            id="test"
                            visible={open && childrenVisible}
                            keepMounted={keepMounted}
                            direction={direction}
                            className={contentClassName}
                            resizable={resizable}
                            width={size}
                            onResize={onResize}
                            onResizeStart={onResizeStart}
                            minResizeWidth={minSize}
                            maxResizeWidth={maxSize}
                        >
                            {children}
                        </DrawerItem>
                    </div>
                );

                if (!usePortal) {
                    return content;
                }

                // When hideVeil=true, we don't use FloatingOverlay to avoid blocking mouse events
                if (hideVeil) {
                    return <Portal>{content}</Portal>;
                }

                return (
                    <Portal>
                        <FloatingOverlay lockScroll={true}>{content}</FloatingOverlay>
                    </Portal>
                );
            }}
        </Transition>
    );
};
