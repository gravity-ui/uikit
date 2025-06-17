import {composeStories} from '@storybook/react-webpack5';

import * as Stories from '../__stories__/Avatar.stories';

export const AvatarStories = composeStories(Stories);
