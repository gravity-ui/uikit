import AutoSizer from 'react-virtualized-auto-sizer';
import type {Size} from 'react-virtualized-auto-sizer';
import {VariableSizeList} from 'react-window';

import type {ListContainerRenderProps} from './types';

const DEFAULT_OVERSCAN_COUNT = 10;

export function VirtualizedListContainer<T>({
    items,
    className,
    children,
    ...props
}: ListContainerRenderProps<T>) {
    return (
        <AutoSizer>
            {({width, height}: Size) => (
                <VariableSizeList
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
                </VariableSizeList>
            )}
        </AutoSizer>
    );
}
