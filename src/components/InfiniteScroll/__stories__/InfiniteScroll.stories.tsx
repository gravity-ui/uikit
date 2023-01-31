import React from 'react';
import {Meta, Story} from '@storybook/react';
import {InfiniteScroll} from '../InfiniteScroll';
import {InfiniteScrollShowcase} from './InfiniteScrollShowcase';

export default {
    title: 'Components/InfiniteScroll',
    component: InfiniteScroll,
} as Meta;

const DefaultTemplate: Story = () => <InfiniteScrollShowcase />;
export const Default = DefaultTemplate.bind({});
