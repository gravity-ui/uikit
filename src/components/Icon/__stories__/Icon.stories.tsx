import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Icon, IconProps} from '../Icon';
import cloudIcon from '../../../../assets/icons/cloud.svg';

export default {
    title: 'Components/Icon',
    component: Icon,
} as Meta;

const DefaultTemplate: Story<IconProps> = (args) => <Icon {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
    data: cloudIcon,
};
