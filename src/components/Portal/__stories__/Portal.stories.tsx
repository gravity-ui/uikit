import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Portal} from '../Portal';
import type {PortalProps} from '../Portal';

export default {
    title: 'Components/Utils/Portal',
    component: Portal,
} as Meta;

const DefaultTemplate: StoryFn<PortalProps> = () => (
    <Portal>
        <span>I am inside the document.body</span>
    </Portal>
);
export const Default = DefaultTemplate.bind({});
