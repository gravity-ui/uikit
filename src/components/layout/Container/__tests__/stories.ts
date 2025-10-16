import {composeStories} from '@storybook/react-webpack5';

import * as CSFStories from '../__stories__/Container.stories';

export const ContainerStories = composeStories(CSFStories);
