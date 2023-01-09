import React from 'react';

import type {ComponentMeta, ComponentStory} from '@storybook/react';

import {SharePopover, sharePopoverDefaultProps} from '../SharePopover';

import {SharePopoverDemo} from './Showcase';

export default {
    title: 'Components/SharePopover',
    component: SharePopover,
    argTypes: {
        title: {
            description: 'Link title',
        },
        text: {
            description: 'link text',
        },
    },
    args: {...sharePopoverDefaultProps},
} as ComponentMeta<typeof SharePopover>;

const DefaultTemplate: ComponentStory<typeof SharePopover> = (args) => <SharePopover {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: ComponentStory<typeof SharePopover & typeof SharePopoverDemo> = () => (
    <SharePopoverDemo />
);
export const Showcase = ShowcaseTemplate.bind({});
