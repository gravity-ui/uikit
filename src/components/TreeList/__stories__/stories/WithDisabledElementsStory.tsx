import * as React from 'react';

import {Button} from '../../../Button';
import {Flex} from '../../../layout';
import {getListItemClickHandler, useList} from '../../../useList';
import type {ListItemType} from '../../../useList';
import {TreeList} from '../../TreeList';
import type {TreeListProps} from '../../types';

export interface WithDisabledElementsStoryProps
    extends Omit<TreeListProps<{text: string}>, 'items' | 'mapItemDataToContentProps'> {}

const items: ListItemType<{text: string}>[] = [
    {
        text: 'default disabled',
        disabled: true,
    },
    {
        text: 'two',
    },
    {
        text: 'default selected',
        selected: true,
    },
    {
        text: 'four',
    },
    {
        text: 'five',
    },
];

export const WithDisabledElementsStory = ({...storyProps}: WithDisabledElementsStoryProps) => {
    const list = useList({items});
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <Flex width="500" gap="5" direction="column" alignItems="flex-start">
            <Flex alignItems="center" gap="1">
                <Button
                    onClick={() => {
                        containerRef.current?.focus();
                    }}
                >
                    focus elements
                </Button>{' '}
                to control from keyboard
            </Flex>
            <TreeList
                {...storyProps}
                list={list}
                containerRef={containerRef}
                mapItemDataToContentProps={({text}) => ({title: text})}
                onItemClick={({id}) => {
                    getListItemClickHandler({list})({id});
                    alert(
                        `Clicked by item with id :"${id}" and data: ${JSON.stringify(list.structure.itemsById[id])}`,
                    );
                }}
            />
        </Flex>
    );
};
