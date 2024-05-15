import React from 'react';

import {Button} from '../../../Button';
import {Flex} from '../../../layout';
import {useListState} from '../../../useList';
import type {ListItemType} from '../../../useList';
import {TreeList} from '../../TreeList';
import type {TreeListProps} from '../../types';

export interface WithDisabledElementsStoryProps
    extends Omit<TreeListProps<{text: string}>, 'items' | 'mapItemDataToProps'> {}

const items: ListItemType<{text: string}>[] = [
    {
        text: 'one',
        disabled: true,
    },
    {
        text: 'two',
    },
    {
        text: 'free',
    },
    {
        text: 'four',
    },
    {
        text: 'five',
    },
];

export const WithDisabledElementsStory = ({...props}: WithDisabledElementsStoryProps) => {
    const {disabledById: _disabledById, setDisabled: _setDisabled, ...listState} = useListState();
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
                {...props}
                containerRef={containerRef}
                items={items}
                {...listState}
                mapItemDataToProps={({text}) => ({title: text})}
                onItemClick={({data, id, selected}) => {
                    listState.setSelected({[id]: !selected});
                    alert(`Clicked by item with id :"${id}" and data: ${JSON.stringify(data)}`);
                }}
            />
        </Flex>
    );
};
