import React from 'react';

import type {Meta, Story} from '@storybook/react';

import {Link} from '../Link';
import type {LinkProps} from '../Link';
import {LinkShowcase} from '../__stories__/LinkShowcase';

export default {
    title: 'Components/Link',
    component: Link,
} as Meta;

const DefaultTemplate: Story<LinkProps> = (args) => <Link {...args}>Link</Link>;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <LinkShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
