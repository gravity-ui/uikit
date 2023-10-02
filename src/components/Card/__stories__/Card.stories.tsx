import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {Card} from '../Card';
import type {CardProps} from '../Card';

import {CardShowcase} from './CardShowcase';

import './Card.stories.scss';

export default {
    title: 'Components/Data Display/Card',
    component: Card,
} as Meta;

const DefaultTemplate: StoryFn<CardProps> = (args) => (
    <Card {...args} className="card-stories">
        <div className="card-content-stories">card&lsquo;s content</div>
    </Card>
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: StoryFn<CardProps> = () => <CardShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
