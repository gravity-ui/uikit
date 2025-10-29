import * as React from 'react';

import type {AriaLabelingProps} from 'src/components/types';

import {useForkRef} from '../../../hooks';
import {block} from '../../utils/cn';
import {filterDOMProps} from '../../utils/filterDOMProps';
import {useResizableDrawerItem} from '../hooks/useResizableDrawerItem';
import type {DrawerDirection, OnResizeHandler} from '../hooks/useResizeHandlers';

import './Drawer.scss';

const b = block('drawer');

export interface DrawerItemProps extends AriaLabelingProps {
    /** Content to be displayed within the drawer item. */
    children?: React.ReactNode;

    /** Determines whether the drawer item is visible or hidden. */
    open?: boolean;

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
     * If not provided, the size will be stored internally.
     */
    size?: number;

    /** Called at the start of resizing. */
    onResizeStart?: OnResizeHandler;

    /** Called at the end of resizing. */
    onResizeEnd?: OnResizeHandler;

    /**
     * Called at the end of resizing. Can be used to save the new width.
     * @param width The new width of the drawer item
     */
    onResize?: OnResizeHandler;

    /** The minimum width of the resizable drawer item */
    minResizeWidth?: number;

    /** The maximum width of the resizable drawer item */
    maxResizeWidth?: number;

    /** Optional inline styles to be applied to the DrawerItem component. */
    style?: React.CSSProperties;
}

export const DrawerItem = React.forwardRef<HTMLDivElement, DrawerItemProps>(
    function DrawerItem(props, ref) {
        const {
            open,
            children,
            direction = 'left',
            className,
            resizable,
            size,
            minResizeWidth,
            maxResizeWidth,
            onResizeStart,
            onResizeEnd,
            onResize,
            style = {},
            ...restProps
        } = props;

        const [isInitialRender, setIsInitialRender] = React.useState(true);
        const itemRef = React.useRef<HTMLDivElement>(null);
        const handleRef = useForkRef(ref, itemRef);

        const {resizedWidth, onResizerPointerDown} = useResizableDrawerItem({
            direction,
            size,
            minResizeWidth,
            maxResizeWidth,
            onResizeStart,
            onResizeEnd,
            onResize,
        });

        const isVerticalDirection = ['left', 'right'].includes(direction);
        const isHorizontalDirection = !isVerticalDirection;

        React.useEffect(() => {
            setIsInitialRender(true);
        }, []);

        const resizerElement = resizable ? (
            <div
                className={b('resizer', {direction})}
                onPointerDown={open && resizable ? onResizerPointerDown : undefined}
                role="presentation"
            >
                <div className={b('resizer-handle', {direction})} />
            </div>
        ) : null;

        return (
            <div
                ref={handleRef}
                className={b(
                    'item',
                    {
                        direction,
                        resizable,
                        hidden: isInitialRender && !open,
                    },
                    [className],
                )}
                style={{
                    ...style,
                    width: isVerticalDirection ? `${resizedWidth}px` : undefined,
                    height: isHorizontalDirection ? `${resizedWidth}px` : undefined,
                }}
                {...filterDOMProps(restProps, {labelable: true})}
            >
                {resizerElement}
                {children}
            </div>
        );
    },
);
