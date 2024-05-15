import React from 'react';

import {Text} from '../../../Text';
import {Flex} from '../../../layout';
import {ListItemView} from '../../../useList';
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
        <Flex gap="5">
            <Flex direction={'column'} gap="3">
                <Text color="secondary">Default TreeList</Text>
                <TreeList {...props} items={items} mapItemDataToProps={identity} />
            </Flex>
            <Flex direction={'column'} gap="3">
                <Text color="secondary">
                    To remove default group view, override corresponding (expanded) prop in
                    renderItem method
                </Text>

                <TreeList
                    {...props}
                    items={items}
                    mapItemDataToProps={identity}
                    renderItem={({props, context: {groupState}, renderContainerProps}) => {
                        // if item group
                        if (groupState) {
                            props.expanded = undefined;
                        }

                        return <ListItemView {...props} {...renderContainerProps} />;
                    }}
                />
            </Flex>
        </Flex>
    );
};
