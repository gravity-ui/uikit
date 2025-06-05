import {composeStories} from '@storybook/react-webpack5';

import * as CSFStories from '../__stories__/Text.stories';

export const TextStories = composeStories(CSFStories);
