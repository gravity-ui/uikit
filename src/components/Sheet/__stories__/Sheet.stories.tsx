import type {Meta} from '@storybook/react';

import {Sheet} from '../Sheet';

import DefaultShowcaseStories from './DefaultShowcase/DefaultShowcase.stories';
import MultipleSheetsStories from './MultipleSheetsShowcase/MultipleSheets.stories';
import WithMenuShowcaseStories from './WithMenuShowcase/WithMenuShowcase.stories';

export default {
    title: 'Components/Overlays/Sheet',
    component: Sheet,
} as Meta;

export {DefaultShowcaseStories, MultipleSheetsStories, WithMenuShowcaseStories};
