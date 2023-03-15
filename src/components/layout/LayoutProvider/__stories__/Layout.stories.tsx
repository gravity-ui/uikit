import React from 'react';
import {Meta, Story} from '@storybook/react';
import Docs from './Layout.docs.mdx';

export default {
    title: 'Layout (unstable)',
    id: 'Layout (unstable)',
    parameters: {
        order: -100,
        docs: {
            page: Docs,
        },
    },
} as Meta;

export const Playground: Story = () => <></>;
Playground.storyName = 'Layout';
