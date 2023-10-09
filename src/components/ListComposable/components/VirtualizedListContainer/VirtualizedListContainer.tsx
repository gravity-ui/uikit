import React from 'react';

import AutoSizer, {Size} from 'react-virtualized-auto-sizer';
import {VariableSizeList as List} from 'react-window';

import type {ListContainerRenderProps} from '../../types';

interface RenderRowProps<T> {
    index: number;
    style: React.CSSProperties;
    data: T[];
}

export const VirtualizedListContainer = React.forwardRef(function <T>(
    {items, className, getItemSize, children}: ListContainerRenderProps<T>,
    ref: any,
) {
    const RenderRow = React.useCallback(
        ({index, style, data: items}: RenderRowProps<T>) => {
            return (
                <div style={style} key={index}>
                    {children({
                        index,
                        item: items[index],
                    })}
                </div>
            );
        },
        [children],
    );

    return (
        <AutoSizer>
            {({width, height}: Size) => (
                <List
                    overscanCount={10}
                    className={className}
                    ref={ref}
                    width={width}
                    height={height}
                    itemCount={items.length}
                    itemData={items}
                    itemSize={getItemSize}
                    // TODO: implement page size
                    // onItemsRendered={console.log}
                >
                    {RenderRow}
                </List>
            )}
        </AutoSizer>
    );
});

VirtualizedListContainer.displayName = 'VirtualizedListContainer';
