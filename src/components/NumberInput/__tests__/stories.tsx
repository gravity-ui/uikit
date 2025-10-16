import {composeStories} from '@storybook/react-webpack5';

import * as DefaultNumberInputStories from '../__stories__/NumberInput.stories';

export const NumberInputStories = composeStories(DefaultNumberInputStories);
