import {composeStories} from '@storybook/react-webpack5';

import * as SuggestStoriesModule from '../__stories__/Suggest.stories';

export const SuggestStories = composeStories(SuggestStoriesModule);
