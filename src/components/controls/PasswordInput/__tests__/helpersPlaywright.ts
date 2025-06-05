import {composeStories} from '@storybook/react-webpack5';

import * as DefaultPasswordInputStories from '../__stories__/PasswordInput.stories';

export const PasswordInputStories = composeStories(DefaultPasswordInputStories);
