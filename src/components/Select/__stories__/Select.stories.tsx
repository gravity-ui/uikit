import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Select} from '..';
import type {SelectProps} from '..';

import {SelectPopupWidthShowcase} from './SelectPopupWidthShowcase';
import {SelectShowcase} from './SelectShowcase';
import {UseSelectOptionsShowcase} from './UseSelectOptionsShowcase';

export default {
    title: 'Components/Inputs/Select',
    component: Select,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: true,
                        selector: 'g-select-control__placeholder', // todo: https://github.com/gravity-ui/uikit/issues/1334
                    },
                ],
            },
            options: {},
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<SelectProps> = (args) => (
    <Select {...args} title={'Select sample'}>
        <Select.Option value="val1" content="Value1" />
        <Select.Option value="val2" content="Value2" />
        <Select.Option value="val3" content="Value3" />
        <Select.Option value="val4" content="Value4" />
    </Select>
);
const ShowcaseTemplate: StoryFn<SelectProps> = (args: SelectProps) => <SelectShowcase {...args} />;
const SelectPopupWidthShowcaseTemplate: StoryFn<SelectProps> = (args) => (
    <SelectPopupWidthShowcase {...args} />
);
const UseSelectOptionsShowcaseTemplate = () => {
    return <UseSelectOptionsShowcase />;
};
export const Default = DefaultTemplate.bind({});
export const Showcase = ShowcaseTemplate.bind({});
export const PopupWidth = SelectPopupWidthShowcaseTemplate.bind({});
export const UseSelectOptions = UseSelectOptionsShowcaseTemplate.bind({});

Showcase.args = {
    view: 'normal',
    size: 'm',
    multiple: false,
    filterable: false,
    disabled: false,
    placeholder: 'Values',
    label: '',
    hasClear: false,
};
