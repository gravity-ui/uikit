import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {UseAsyncActionHandlerDemo} from './UseAsyncActionHandlerDemo';

export default {
    title: 'Hooks/useAsyncActionHandler',
} as Meta;

export const Showcase: StoryFn = () => <UseAsyncActionHandlerDemo />;
