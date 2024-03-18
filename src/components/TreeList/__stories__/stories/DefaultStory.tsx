import React from 'react';

import {Flex} from '../../../layout';
import {createRandomizedData} from '../../../useList/__stories__/utils/makeData';
import {TreeList} from '../../TreeList';
import type {TreeListProps} from '../../types';

function identity<T>(value: T): T {
    return value;
}

export interface DefaultStoryProps
    extends Omit<TreeListProps<{title: string}>, 'items' | 'mapItemDataToProps'> {
    itemsCount?: number;
}

export const DefaultStory = ({itemsCount = 5, ...props}: DefaultStoryProps) => {
    const items = React.useMemo(() => createRandomizedData({num: itemsCount}), [itemsCount]);

    return (
        <Flex width="500">
            <TreeList {...props} items={items} mapItemDataToProps={identity} />
        </Flex>
    );
};
