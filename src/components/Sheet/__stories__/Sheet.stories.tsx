import type {Meta} from '@storybook/react';

import {Sheet} from '../Sheet';

import {Showcase} from './DefaultShowcase/DefaultShowcase.stories';
import {WithMenuShowcase} from './WithMenuShowcase/WithMenuShowcase.stories';

export default {
    title: 'Components/Overlays/Sheet',
    component: Sheet,
} as Meta;

export const Default = Showcase.bind({});

Default.args = {
    allowHideOnContentScroll: false,
};

export const WithMenu = WithMenuShowcase.bind({});
