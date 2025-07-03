import {composeStories} from '@storybook/react-webpack5';

import * as CSFStories from '../__stories__/Row.stories';

export const RowStories = composeStories(CSFStories);
