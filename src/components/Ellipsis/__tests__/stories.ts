import {composeStories} from '@storybook/react-webpack5';

import * as Stories from '../__stories__/Ellipsis.stories';

export const EllipsisStories = composeStories(Stories);
