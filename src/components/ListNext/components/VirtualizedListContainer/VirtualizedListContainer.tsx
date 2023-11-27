import React from 'react';

import AutoSizer, {Size} from 'react-virtualized-auto-sizer';
import {VariableSizeList as List} from 'react-window';

import type {ListContainerRenderProps} from './types';

const DEFAULT_OVERSCAN_COUNT = 10;

/**
 * Ready to use tin wrapper around `react-window`
 *
 * @return -
 */
export function VirtualizedListContainer<T>({
    items,
    className,
    children,
    ...props
}: ListContainerRenderProps<T>) {
    return (
        <AutoSizer>
            {({width, height}: Size) => (
                <List
                    overscanCount={DEFAULT_OVERSCAN_COUNT}
                    className={className}
                    width={width}
                    height={height}
                    itemCount={items.length}
                    itemData={items}
                    {...props}
                >
                    {({index, style, data}) => (
                        <div style={style} key={index}>
                            {children(data[index], index)}
                        </div>
                    )}
                </List>
            )}
        </AutoSizer>
    );
}
