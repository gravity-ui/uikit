import {composeStories} from '@storybook/react-webpack5';

import * as DefaultSuggestStories from '../__stories__/Suggest.stories';

export const SuggestStories = composeStories(DefaultSuggestStories);
