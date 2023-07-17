import React from 'react';

import {Gear} from '@gravity-ui/icons';
import type {Meta, StoryFn} from '@storybook/react';

import {Icon} from '../Icon';
import type {IconProps} from '../Icon';

export default {
    title: 'Components/Icon',
    component: Icon,
} as Meta;

const DefaultTemplate: StoryFn<IconProps> = (args) => <Icon {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    data: Gear,
};
