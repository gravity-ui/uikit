import * as React from 'react';

import type {AriaLabelingProps} from 'src/components/types';

import {block} from '../../utils/cn';
import {useResizableDrawerItem} from '../hooks/useResizableDrawerItem';
import type {DrawerPlacement, OnResizeHandler} from '../hooks/useResizeHandlers';

import './Drawer.scss';

const b = block('drawer');

export interface DrawerItemProps extends AriaLabelingProps {
    /** Content to be displayed within the drawer item. */
    children?: React.ReactNode;

    /** Determines whether the drawer item is visible or hidden. */
    open?: boolean;

    /**
     * Specifies the side from which the drawer should slide in, `left` by default.
     * @default left
     */
    placement?: DrawerPlacement;

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
            placement = 'left',
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

        const {resizedSize, onResizerPointerDown} = useResizableDrawerItem({
            placement,
            size,
            minSize,
            maxSize,
            onResizeStart,
            onResizeEnd,
            onResize,
        });

        const isVerticalArrangement = ['left', 'right'].includes(placement);
        const isHorizontalArrangement = !isVerticalArrangement;

        const resizerElement = resizable ? (
            <div
                className={b('resizer')}
                onPointerDown={open && resizable ? onResizerPointerDown : undefined}
            >
                <div className={b('resizer-handle')} />
            </div>
        ) : null;

        return (
            <div
                ref={ref}
                className={b(
                    'item',
                    {
                        resizable,
                        hidden: !open,
                    },
                    className,
                )}
                style={{
                    ...style,
                    width: isVerticalArrangement ? `${resizedSize}px` : undefined,
                    height: isHorizontalArrangement ? `${resizedSize}px` : undefined,
                }}
                {...restProps}
            >
                {resizerElement}
                {children}
            </div>
        );
    },
);
