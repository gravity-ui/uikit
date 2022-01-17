import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Toast} from '../Toast/Toast';
import {ToasterDemo} from './ToasterShowcase';

export default {
    title: 'Components/Toaster',
    component: Toast,
} as Meta;

const DefaultTemplate: Story = () => <ToasterDemo />;
export const Default = DefaultTemplate.bind({});
