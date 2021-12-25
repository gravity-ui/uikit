import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {Card, CardProps} from '../Card';
import './Card.stories.scss';
import {CardDemo} from '../../../demo/Components/Card';

export default {
    title: 'Components/Card',
    customPath: 'Components/Card',
    component: Card,
} as Meta;

const DefaultTemplate: Story<CardProps> = (args: any) => (
    <Card {...args} className="card">
        {''}
    </Card>
);
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story<CardProps> = (args: any) => <CardDemo {...args} />;
export const Showcase = ShowcaseTemplate.bind({});
