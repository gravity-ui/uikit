import {composeStories} from '@storybook/react-webpack5';

import * as CSFStories from '../__stories__/DefinitionList.stories';

export const DefinitionListStories = composeStories(CSFStories);
