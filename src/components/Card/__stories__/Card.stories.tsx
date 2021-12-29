import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Card, CardProps} from '../Card';
import {CardShowcase} from './CardShowcase';

import './Card.stories.scss';

export default {
    title: 'Components/Card',
    component: Card,
} as Meta;

const DefaultTemplate: Story<CardProps> = (args: any) => (
    <Card {...args} className="card-stories" />
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story<CardProps> = (args: any) => <CardShowcase {...args} />;
export const Showcase = ShowcaseTemplate.bind({});
