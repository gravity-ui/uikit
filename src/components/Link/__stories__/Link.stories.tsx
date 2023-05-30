import React from 'react';

import {Meta, Story} from '@storybook/react';

import {Link, LinkProps} from '../Link';
import {LinkShowcase} from '../__stories__/LinkShowcase';

export default {
    title: 'Components/Link',
    component: Link,
} as Meta;

const DefaultTemplate: Story<LinkProps> = (args) => <Link {...args}>Link</Link>;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <LinkShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
