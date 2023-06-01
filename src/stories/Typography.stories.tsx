import React from 'react';

import type {Meta, Story} from '@storybook/react/types-6-0';

import {Typography} from '../demo/Typography/Typography';

export default {
    title: 'Typography',
} as Meta;

export const Common: Story = () => <Typography />;
