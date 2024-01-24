import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Link, type LinkProps} from '../Link';
import {LinkShowcase} from '../__stories__/LinkShowcase';

export default {
    title: 'Components/Navigation/Link',
    component: Link,
} as Meta;

const DefaultTemplate: StoryFn<LinkProps> = (args) => <Link {...args}>Link</Link>;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn = () => <LinkShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
