import {composeStories} from '@storybook/react';

import * as DefaultCardStories from '../__stories__/Card.stories';

export const CardStories = composeStories(DefaultCardStories);
