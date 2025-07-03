import {composeStories} from '@storybook/react-webpack5';

import * as CSFStories from '../__stories__/Flex.stories';

export const FlexStories = composeStories(CSFStories);
