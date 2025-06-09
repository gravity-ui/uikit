import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {UseAsyncActionHandlerDemo} from './UseAsyncActionHandlerDemo';

export default {
    title: 'Hooks/useAsyncActionHandler',
} as Meta;

export const Showcase: StoryFn = () => <UseAsyncActionHandlerDemo />;
