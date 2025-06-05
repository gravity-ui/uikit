import {composeStories} from '@storybook/react-webpack5';

import * as CSFStories from '../__stories__/Col.stories';

export const ColStories = composeStories(CSFStories);
