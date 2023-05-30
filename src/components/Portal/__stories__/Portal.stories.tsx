import React from 'react';

import {Meta, Story} from '@storybook/react';

import {Portal, PortalProps} from '../Portal';

export default {
    title: 'Components/Portal',
    component: Portal,
} as Meta;

const DefaultTemplate: Story<PortalProps> = () => (
    <Portal>
        <span>I am inside the document.body</span>
    </Portal>
);
export const Default = DefaultTemplate.bind({});
