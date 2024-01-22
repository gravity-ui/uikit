import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Flex} from '../../layout';

import {PopupWithTogglerList, PopupWithTogglerListProps} from './components/PopupWithTogglerList';

export default {
    title: 'Unstable/useList/PopupWithToggler',
    component: PopupWithTogglerList,
} as Meta;

const PopupWithTogglerTemplate: StoryFn<PopupWithTogglerListProps> = (props) => {
    return (
        <Flex>
            <PopupWithTogglerList {...props} />
        </Flex>
    );
};
export const PopupWithToggler = PopupWithTogglerTemplate.bind({});
PopupWithToggler.args = {
    itemsCount: 10,
    size: 'm',
};
