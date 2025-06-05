import {composeStories} from '@storybook/react-webpack5';

import * as Stories from '../__stories__/UserLabel.stories';

export const UserLabelStories = composeStories(Stories);
