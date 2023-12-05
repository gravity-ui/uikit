import {composeStories} from '@storybook/react';

import * as LabelStories from '../__stories__/Label.stories';

export const {
    Default,
    Theme,
    Size,
    Interactive,
    Icon,
    Close,
    Copy,
    Value,
    LinkWrapper,
    ShowcaseStory,
} = composeStories(LabelStories);
