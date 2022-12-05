import React from 'react';
import {Story} from '@storybook/react';
import {Tooltip, TooltipProps} from '../Tooltip';
import {Button} from '../../Button';
import {TooltipLayout, TooltipLayoutProps} from '../Layout';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
};

const DefaultTemplate: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    content: 'Hello world!',
    children: <Button>Hover to see tooltip</Button>,
};

export const Layout: Story<TooltipLayoutProps> = (args) => (
    <Tooltip content={<TooltipLayout {...args} />}>
        <Button>Hover to see tooltip</Button>
    </Tooltip>
);

Layout.args = {
    title: 'Tooltip text',
    hotkey: 'mod+s',
    description:
        'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
};
