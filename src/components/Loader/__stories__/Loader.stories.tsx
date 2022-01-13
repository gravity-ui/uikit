import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Loader, LoaderProps} from '../Loader';

export default {
    title: 'Components/Loader',
    component: Loader,
} as Meta;

const DefaultTemplate: Story<LoaderProps> = (args) => <Loader {...args} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: Story<LoaderProps> = (args) => {
    return (
        <>
            <Loader {...args} size="s" />
            <span style={{margin: '16px'}} />
            <Loader {...args} size="m" />
            <span style={{margin: '16px'}} />
            <Loader {...args} size="l" />
        </>
    );
};

export const Size = SizeTemplate.bind({});
