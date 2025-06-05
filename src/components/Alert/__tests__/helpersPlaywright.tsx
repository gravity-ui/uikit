import {composeStories} from '@storybook/react-webpack5';

import * as DefaultAlertStories from '../__stories__/Alert.stories';

export const AlertStories = composeStories(DefaultAlertStories);
