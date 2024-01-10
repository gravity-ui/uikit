import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Avatar} from '../../../../Avatar';
import {Flex} from '../../../../layout';
import {useListState} from '../../../hooks/useListState';
import type {ListItemId} from '../../../types';
import {ListItemView as ListItemViewComponent, ListItemViewProps} from '../ListItemView';

export default {
    title: 'Unstable/useList/ListItemView',
    component: ListItemViewComponent,
} as Meta;

const title = 'title';
const subtitle = 'subtitle';

const stories: ListItemViewProps[] = [
    {
        id: '1',
        title,
        activeOnHover: false,
        subtitle,
        disabled: true,
        startSlot: (
            <Avatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        id: '2',
        title,
        subtitle,
        activeOnHover: false,
    },
    {
        id: '3',
        title,
        size: 'l',
        subtitle,
        hasSelectionIcon: false,
        startSlot: (
            <Avatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        id: '4',
        title,
        disabled: true,
        size: 'xl',
        height: 60,
        startSlot: (
            <Avatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
    },
    {
        id: '5',
        size: 'l',
        startSlot: (
            <Avatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
        title,
    },
    {
        id: '6',
        title,
        size: 'l',
        subtitle: 'indentation 1',
        startSlot: (
            <Avatar imgUrl="https://avatars.mds.yandex.net/get-yapic/69015/enc-137b8b64288fa6fc5ec58c6b83aea00e7723c8fa5638c078312a1134d8ee32ac/islands-retina-50" />
        ),
        indentation: 1,
        selected: true,
    },
    {
        id: '7',
        expanded: true,
        size: 'xl',
        title: 'Group 1',
    },
    {
        id: '8',
        hasSelectionIcon: false,
        expanded: true,
        size: 'xl',
        title: 'Group 1',
    },
];

const ListItemViewTemplate: StoryFn<ListItemViewProps> = () => {
    const listState = useListState();

    return (
        <Flex direction="column" width={300}>
            {stories.map((props, i) => (
                <ListItemViewComponent
                    key={i}
                    {...props}
                    selected={listState.selectedById[props.id]}
                    onClick={handleClick(props.id)}
                />
            ))}
        </Flex>
    );

    function handleClick(id: ListItemId) {
        return () => {
            listState.setSelected((prevState) => ({
                ...prevState,
                [id]: !prevState[id],
            }));
        };
    }
};
export const ListItemView = ListItemViewTemplate.bind({});
