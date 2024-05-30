import React from 'react';

import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import type {ClipboardButtonProps} from '../ClipboardButton';
import {ClipboardButton} from '../ClipboardButton';

export default {
    title: 'Components/Utils/ClipboardButton',
    component: ClipboardButton,
} as Meta;

type Story = StoryObj<typeof ClipboardButton>;

export const Default: Story = {
    args: {
        onCopy: action('onCopy'),
        onMouseEnter: action('onMouseEnter'),
        onMouseLeave: action('onMouseLeave'),
        onFocus: action('onFocus'),
        onBlur: action('onBlur'),
    },
};

export const CustomTooltipText: Story = {
    args: {
        hasTooltip: true,
        tooltipInitialText: 'Initial text',
        tooltipSuccessText: 'Success text',
    },
    name: 'Custom tooltip text',
};

export const CustomTimeout: Story = {
    args: {
        timeout: 5000,
    },
    name: 'Custom timeout',
};

const viewCases: Array<ClipboardButtonProps['view']> = [
    'normal',
    'action',
    'outlined',
    'outlined-info',
    'outlined-success',
    'outlined-warning',
    'outlined-danger',
    'outlined-utility',
    'outlined-action',
    'raised',
    'flat',
    'flat-secondary',
    'flat-info',
    'flat-success',
    'flat-warning',
    'flat-danger',
    'flat-utility',
    'flat-action',
    'normal-contrast',
    'outlined-contrast',
    'flat-contrast',
];

export const View: Story = {
    render: (args) => (
        <Showcase>
            {viewCases.map((view) => {
                return (
                    <ShowcaseItem title={`View ${view}`} key={view}>
                        <ClipboardButton {...args} view={view} />
                    </ShowcaseItem>
                );
            })}
        </Showcase>
    ),
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="Size xs">
                <ClipboardButton {...args} size="xs" />
            </ShowcaseItem>
            <ShowcaseItem title="Size s">
                <ClipboardButton {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <ClipboardButton {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <ClipboardButton {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <ClipboardButton {...args} size="xl" />
            </ShowcaseItem>
        </Showcase>
    ),
};
