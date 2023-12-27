import {composeStories} from '@storybook/react';

import * as Stories from '../__stories__/User.stories';

export const {Default} = composeStories(Stories);
