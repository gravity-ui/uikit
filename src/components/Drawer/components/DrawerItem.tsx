import * as React from 'react';

import {useForkRef} from '../../../hooks';
import {block} from '../../utils/cn';
import {useResizableDrawerItem} from '../utils';
import type {DrawerDirection, OnResizeHandler} from '../utils';

const b = block('drawer');

import './Drawer.scss';

export interface DrawerItemProps {
    /** Unique identifier for the drawer item. */
    id: string;

    /** Content to be displayed within the drawer item. */
    children?: React.ReactNode;

    /** Determines whether the drawer item is visible or hidden. */
    visible?: boolean;

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

    disablePortal?: boolean;

    /** Optional inline styles to be applied to the DrawerItem component. */
    style?: React.CSSProperties;
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
            onResizeEnd,
            onResize,
            style = {},
            disablePortal,
            ...rest
        } = props;

        const [isInitialRender, setInitialRender] = React.useState(true);
        const itemRef = React.useRef<HTMLDivElement>(null);
        const handleRef = useForkRef(ref, itemRef);

        const cssDirection = direction === 'left' ? undefined : direction;

        const {resizedWidth, onResizerPointerDown, isResizing} = useResizableDrawerItem({
            direction,
            width,
            minResizeWidth,
            maxResizeWidth,
            onResizeStart,
            onResizeEnd,
            onResize,
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
            <div
                className={b('resizer', {direction})}
                onPointerDown={visible && resizable ? onResizerPointerDown : undefined}
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
                        direction: cssDirection,
                        hidden: isInitialRender && !visible,
                        resize: isResizing,
                        'disable-portal': disablePortal,
                    },
                    [className],
                )}
                style={innerStyle}
                {...rest}
            >
                {resizerElement}
                {children}
            </div>
        );
    },
);
