import {composeStories} from '@storybook/react';

import * as ToastStoriesImport from '../__stories__/Toaster.stories';

export const ToastStories = composeStories(ToastStoriesImport, {
    globals: {
        screenshotTests: true,
    },
});
