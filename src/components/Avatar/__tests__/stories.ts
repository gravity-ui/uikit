import {composeStories} from '@storybook/react';

import * as Stories from '../__stories__/Avatar.stories';

export const {
    Image,
    ImageFallback,
    Icon,
    Text,
    TextInitials,
    WithBorder,
    AvatarShowcase: Showcase,
} = composeStories(Stories);
