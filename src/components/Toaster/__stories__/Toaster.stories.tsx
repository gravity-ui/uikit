import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Toast} from '../Toast/Toast';
import {ToasterDemo} from './ToasterShowcase';

export default {
    title: 'Components/Toaster',
    component: Toast,
} as ComponentMeta<typeof Toast>;

const DefaultTemplate: ComponentStory<typeof Toast> = () => <ToasterDemo />;
export const Default = DefaultTemplate.bind({});
