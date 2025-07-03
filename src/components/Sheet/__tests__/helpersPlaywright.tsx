import {composeStories} from '@storybook/react-webpack5';

import * as stories from '../__stories__/DefaultShowcase/DefaultShowcase.stories';

export const SheetStories = composeStories(stories);
