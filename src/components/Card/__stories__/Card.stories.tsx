import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Card, CardProps} from '../Card';
import {CardShowcase} from './CardShowcase';

import './Card.stories.scss';

export default {
    title: 'Components/Card',
    component: Card,
} as Meta;

const DefaultTemplate: Story<CardProps> = (args) => (
    <Card {...args} className="card-stories">
        <div className="card-content-stories">card&lsquo;s content</div>
    </Card>
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story<CardProps> = () => <CardShowcase />;
export const Showcase = ShowcaseTemplate.bind({});
