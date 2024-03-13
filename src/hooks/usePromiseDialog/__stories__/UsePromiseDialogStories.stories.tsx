import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {UsePromiseDialogDemo} from './UsePromiseDialogDemo';

export default {
    title: 'Hooks/usePromiseDialog',
} as Meta;

export const Showcase: StoryFn = () => <UsePromiseDialogDemo />;
