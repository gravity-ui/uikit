import {composeStories} from '@storybook/react';

import * as TableStories from '../__stories__/Table.stories';

export const {HOCWithTableSelection} = composeStories(TableStories);
