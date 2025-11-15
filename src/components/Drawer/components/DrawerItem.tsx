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
     * The width or height of the resizable drawer item.
     * If not provided, the size will be stored internally.
     */
    size?: number;

    /** Called at the start of resizing. */
    onResizeStart?: OnResizeHandler;

    /** Called at the end of resizing. */
    onResizeEnd?: OnResizeHandler;

    /**
     * Called at the end of resizing. Can be used to save the new size.
     * @param size The new size of the drawer item
     */
    onResize?: OnResizeHandler;

    /** The minimum size of the resizable drawer item */
    minSize?: number;

    /** The maximum size of the resizable drawer item */
    maxSize?: number;

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
            minSize,
            maxSize,
            onResizeStart,
            onResizeEnd,
            onResize,
            style = {},
            ...restProps
        } = props;

        const itemRef = React.useRef<HTMLDivElement>(null);
        const handleRef = useForkRef(ref, itemRef);

        const {resizedSize, onResizerPointerDown} = useResizableDrawerItem({
            direction,
            size,
            minSize,
            maxSize,
            onResizeStart,
            onResizeEnd,
            onResize,
        });

        const isVerticalDirection = ['left', 'right'].includes(direction);
        const isHorizontalDirection = !isVerticalDirection;

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
                        hidden: !open,
                    },
                    [className],
                )}
                style={{
                    ...style,
                    width: isVerticalDirection ? `${resizedSize}px` : undefined,
                    height: isHorizontalDirection ? `${resizedSize}px` : undefined,
                }}
                {...filterDOMProps(restProps, {labelable: true})}
            >
                {resizerElement}
                {children}
            </div>
        );
    },
);
