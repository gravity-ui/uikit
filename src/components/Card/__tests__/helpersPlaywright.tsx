import {composeStories} from '@storybook/react-webpack5';

import * as DefaultCardStories from '../__stories__/Card.stories';

export const CardStories = composeStories(DefaultCardStories);
