import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Select} from '../..';
import type {SelectProps} from '../..';

import {SelectHooks} from './SelectHooks';

export default {
    title: 'Components/Inputs/Select/hooks',
    component: Select,
} as Meta;

const SelectAllHookTemplate: StoryFn<SelectProps> = (args: SelectProps) => (
    <SelectHooks {...args} />
);

export const SelectAll = SelectAllHookTemplate.bind({});
