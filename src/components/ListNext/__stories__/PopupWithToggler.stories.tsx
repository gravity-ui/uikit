import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';

import {PopupWithTogglerList, PopupWithTogglerListProps} from './components/PopupWithTogglerList';

export default {
    title: 'Unstable/useList/PopupWithToggler',
    component: PopupWithTogglerList,
} as Meta;

const PopupWithTogglerScroll: StoryFn<PopupWithTogglerListProps> = (props) => {
    return (
        <Flex>
            <PopupWithTogglerList {...props} />
        </Flex>
    );
};
export const Examples = PopupWithTogglerScroll.bind({});
Examples.args = {
    itemsCount: 10,
    size: 'm',
};
