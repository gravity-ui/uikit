import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ShareTooltip, ShareTooltipProps, shareTooltipDefaultProps} from '../ShareTooltip';
import {ShareTooltipDemo} from '../../../demo/ShareTooltip';

export default {
    title: 'Components/ShareTooltip',
    component: ShareTooltip,
    argTypes: {
        title: {
            description: 'заголовок к ссылке',
        },
        text: {
            description: 'текст к ссылке',
        },
    },
    args: {...shareTooltipDefaultProps},
} as Meta;

const DefaultTemplate: Story<ShareTooltipProps> = (args) => <ShareTooltip {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <ShareTooltipDemo />;
export const Showcase = ShowcaseTemplate.bind({});
