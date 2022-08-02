import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {ShareTooltip, shareTooltipDefaultProps} from '../ShareTooltip';
import {ShareTooltipDemo} from './Showcase';

export default {
    title: 'Components/ShareTooltip',
    component: ShareTooltip,
    argTypes: {
        title: {
            description: 'Link title',
        },
        text: {
            description: 'link text',
        },
    },
    args: {...shareTooltipDefaultProps},
} as ComponentMeta<typeof ShareTooltip>;

const DefaultTemplate: ComponentStory<typeof ShareTooltip> = (args) => <ShareTooltip {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: ComponentStory<typeof ShareTooltip & typeof ShareTooltipDemo> = () => (
    <ShareTooltipDemo />
);
export const Showcase = ShowcaseTemplate.bind({});
