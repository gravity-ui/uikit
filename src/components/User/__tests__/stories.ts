import {composeStories} from '@storybook/react-webpack5';

import * as Stories from '../__stories__/User.stories';

export const UserStories = composeStories(Stories);
