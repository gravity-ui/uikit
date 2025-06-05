import {composeStories} from '@storybook/react-webpack5';

import * as ToastStoriesImport from '../__stories__/Toaster.stories';

export const ToastStories = composeStories(ToastStoriesImport, {
    initialGlobals: {
        screenshotTests: true,
    },
});
