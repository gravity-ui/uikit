import {composeStories} from '@storybook/react-webpack5';

import * as DefaultFileDropZoneStories from '../__stories__/FileDropZone.stories';

export const FileDropZoneStories = composeStories(DefaultFileDropZoneStories);
