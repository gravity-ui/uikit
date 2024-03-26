import {composeStories} from '@storybook/react';

import * as ButtonStories from '../__stories__/Button.stories';

export const {
    Default,
    Selected,
    Size,
    View,
    Icon,
    Disabled,
    Loading,
    Width,
    Pin,
    Link,
    InsideText,
} = composeStories(ButtonStories);
