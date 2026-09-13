import * as React from 'react';

import type {TreeListMapItemDataToContentProps} from '../TreeList/types';
import type {ListItemId} from '../useList';

import type {TreeSelectRenderSelectedOption} from './types';

export function getSelectedOptionsContent<T>(
    itemsById: Record<ListItemId, T>,
    value: ListItemId[],
    mapItemDataToContentProps: TreeListMapItemDataToContentProps<T>,
    renderSelectedOption?: TreeSelectRenderSelectedOption<T>,
): React.ReactNode {
    if (value.length === 0) {
        return null;
    }

    if (renderSelectedOption) {
        return value.map((id, index) => (
            <React.Fragment key={id}>
                {renderSelectedOption(
                    {id, data: id in itemsById ? itemsById[id] : undefined},
                    index,
                )}
            </React.Fragment>
        ));
    }

    const titles = value.map((id) =>
        id in itemsById ? mapItemDataToContentProps(itemsById[id]).title : '',
    );

    // `title` is a ReactNode, so it can only be joined into a string when every part is a string
    if (titles.every((title) => typeof title === 'string')) {
        return titles.join(', ');
    }

    return titles.map((title, index) => (
        <React.Fragment key={value[index]}>
            {index > 0 ? ', ' : null}
            {title}
        </React.Fragment>
    ));
}
