import * as React from 'react';

import {FloatingOverlay} from '@floating-ui/react';
import {CSSTransition, Transition} from 'react-transition-group';

import {useForkRef} from '../../hooks';
import {Portal} from '../Portal';
import {block} from '../utils/cn';

import {useResizableDrawerItem, useScrollLock} from './utils';
import type {DrawerDirection, OnResizeContinueHandler, OnResizeHandler} from './utils';

import './Drawer.scss';

const b = block('drawer');
const TIMEOUT = 300;

export interface DrawerItemProps {
    /** Unique identifier for the drawer item. */
    id: string;

    /** Content to be displayed within the drawer item. */
    children?: React.ReactNode;

    /** Determines whether the drawer item is visible or hidden. */
    visible: boolean;

    /**
     * Specifies the direction from which the drawer should slide in, `left` by default.
     * @default left
     */
    direction?: DrawerDirection;

    /** Additional custom class name applied to the drawer item. */
    className?: string;

    /** Determines whether the drawer item can be resized */
    resizable?: boolean;

    /**
     * The width of the resizable drawer item.
     * If not provided, the width will be stored internally.
     */
    width?: number;

    /** Called at the start of resizing. */
    onResizeStart?: VoidFunction;

    /**
     * Called at the end of resizing. Can be used to save the new width.
     * @param width The new width of the drawer item
     * @param event The original event
     */
    onResize?: OnResizeHandler;

    /**
     * Callback function called each time when the drawer item is resizing.
     * Do not use it to store the new width for DrawerItem `width` prop. Use `onResize` instead.
     * @param width The new width of the drawer item
     */
    onResizeContinue?: OnResizeContinueHandler;

    /** The minimum width of the resizable drawer item */
    minResizeWidth?: number;

    /** The maximum width of the resizable drawer item */
    maxResizeWidth?: number;

    /**
     * Keep child components mounted when closed, prioritized over Drawer.keepMounted property
     * @default false
     */
    keepMounted?: boolean;

    /** Optional inline styles to be applied to the DrawerItem component. */
    style?: React.CSSProperties;

    /** `data-qa` HTML attribute, used for testing. */
    qa?: string;
}

export const DrawerItem = React.forwardRef<HTMLDivElement, DrawerItemProps>(
    function DrawerItem(props, ref) {
        const {
            visible,
            children,
            direction = 'left',
            className,
            resizable,
            width,
            minResizeWidth,
            maxResizeWidth,
            onResizeStart,
            onResizeContinue,
            onResize,
            keepMounted = false,
            style = {},
            qa,
        } = props;

        const [isInitialRender, setInitialRender] = React.useState(true);
        const itemRef = React.useRef<HTMLDivElement>(null);
        const handleRef = useForkRef(ref, itemRef);

        const cssDirection = direction === 'left' ? undefined : direction;

        const {resizedWidth, resizerHandlers, isResizing} = useResizableDrawerItem({
            direction,
            width,
            minResizeWidth,
            maxResizeWidth,
            onResizeStart,
            onResize,
            onResizeContinue,
        });

        const innerStyle = React.useMemo(() => {
            const css = {...style};
            if (resizable) {
                if (['left', 'right'].includes(direction)) {
                    css.width = `${resizedWidth}px`;
                } else {
                    css.height = `${resizedWidth}px`;
                }
            }

            return css;
        }, [direction, resizable, resizedWidth, style]);

        React.useEffect(() => {
            setInitialRender(true);
        }, [direction]);

        const resizerElement = resizable ? (
            <div className={b('resizer', {direction})} {...resizerHandlers}>
                <div className={b('resizer-handle', {direction})} />
            </div>
        ) : null;

        return (
            <CSSTransition
                in={visible}
                timeout={TIMEOUT}
                mountOnEnter={!keepMounted}
                unmountOnExit={!keepMounted}
                classNames={b('item-transition', {direction: cssDirection})}
                nodeRef={itemRef}
                onEnter={() => setInitialRender(false)}
                onExit={() => setInitialRender(false)}
            >
                <div
                    ref={handleRef}
                    className={b(
                        'item',
                        {
                            direction: cssDirection,
                            hidden: isInitialRender && !visible,
                            resize: isResizing,
                        },
                        [className],
                    )}
                    style={innerStyle}
                    data-qa={qa}
                >
                    {resizerElement}
                    {children}
                </div>
            </CSSTransition>
        );
    },
);

type DrawerChild = React.ReactElement<DrawerItemProps>;

export interface DrawerProps {
    /** Child components to be rendered within the drawer. This can be a single child or an array of children. */
    children: DrawerChild | DrawerChild[];

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

    /** Optional flag to doesn't use `Portal` for drawer */
    disablePortal?: boolean;

    /**
     * Keep child components mounted when closed
     * @default false
     */
    keepMounted?: boolean;

    /**
     * Whether to lock page scroll when drawer is open.
     * Applied only when hideVeil=true and disablePortal=false.
     * @default false
     */
    scrollLock?: boolean;

    /** `data-qa` HTML attribute, used for testing. */
    qa?: string;
}

export const Drawer = ({
    className,
    veilClassName,
    children,
    style,
    onVeilClick,
    onEscape,
    hideVeil,
    disablePortal = true,
    keepMounted = false,
    scrollLock = false,
    qa,
}: DrawerProps) => {
    let someItemVisible = false;
    React.Children.forEach(children, (child) => {
        if (React.isValidElement<DrawerItemProps>(child) && child.type === DrawerItem) {
            const childVisible = Boolean(child.props.visible);
            if (childVisible) {
                someItemVisible = true;
            }
        }
    });

    React.useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onEscape?.(event);
            }
        }
        if (someItemVisible) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [onEscape, someItemVisible]);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const veilRef = React.useRef<HTMLDivElement>(null);

    const shouldApplyScrollLock = scrollLock && someItemVisible && hideVeil && !disablePortal;
    useScrollLock(shouldApplyScrollLock);

    return (
        <Transition
            in={someItemVisible}
            timeout={{enter: 0, exit: TIMEOUT}}
            mountOnEnter={!keepMounted}
            unmountOnExit={!keepMounted}
            nodeRef={containerRef}
        >
            {(state) => {
                const childrenVisible = someItemVisible && state === 'entered';

                const content = (
                    <div
                        ref={containerRef}
                        className={b({hideVeil}, className)}
                        style={style}
                        data-qa={qa}
                    >
                        <CSSTransition
                            in={childrenVisible}
                            timeout={TIMEOUT}
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
                        {React.Children.map(children, (child) => {
                            if (
                                React.isValidElement<DrawerItemProps>(child) &&
                                child.type === DrawerItem
                            ) {
                                const childVisible = Boolean(child.props.visible);
                                return React.cloneElement(child, {
                                    keepMounted,
                                    ...child.props,
                                    visible: childVisible && childrenVisible,
                                });
                            }
                            return child;
                        })}
                    </div>
                );

                if (disablePortal) {
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
