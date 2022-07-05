import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Toast} from '../Toast/Toast';
import {ToasterDemo} from './ToasterShowcase';
import {ToasterProvider} from '../Provider/ToasterProvider';

export default {
    title: 'Components/Toaster',
    component: Toast,
    decorators: [
        function withToasters(Story) {
            return (
                <ToasterProvider>
                    <Story />
                </ToasterProvider>
            );
        },
    ],
} as ComponentMeta<typeof Toast>;

const DefaultTemplate: ComponentStory<typeof Toast> = () => <ToasterDemo />;
export const Default = DefaultTemplate.bind({});
