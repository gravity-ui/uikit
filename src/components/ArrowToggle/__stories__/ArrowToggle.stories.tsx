import React, {useState} from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {ArrowToggle, ArrowToggleProps} from '../ArrowToggle';

export default {
    title: 'Components/ArrowToggle',
    component: ArrowToggle,
} as Meta;

const DefaultTemplate: Story<ArrowToggleProps> = (args) => <ArrowToggle {...args} />;
export const Default = DefaultTemplate.bind({});

const DirectionsTemplate: Story<ArrowToggleProps> = (args) => {
    return (
        <>
            <ArrowToggle {...args} direction="top" /> top
            <ArrowToggle {...args} direction="right" /> right
            <ArrowToggle {...args} direction="bottom" /> bottom
            <ArrowToggle {...args} direction="left" /> left
        </>
    );
};

export const Directions = DirectionsTemplate.bind({});

const SizesTemplate: Story<ArrowToggleProps> = (args) => {
    return (
        <>
            <ArrowToggle {...args} size={10} /> 10
            <ArrowToggle {...args} size={20} /> 20
            <ArrowToggle {...args} size={30} /> 30
            <ArrowToggle {...args} size={40} /> 40
            <ArrowToggle {...args} size={50} /> 50
            <ArrowToggle {...args} size={100} /> 100
        </>
    );
};

export const Sizes = SizesTemplate.bind({});

export const Interactive: Story<ArrowToggleProps> = (args) => {
    const [directionIndex, setDirectionIndex] = useState(0);
    const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;
    const direction = directions[directionIndex % directions.length];

    return (
        <span onClick={() => setDirectionIndex(directionIndex + 1)} style={{cursor: 'pointer'}}>
            <ArrowToggle {...args} size={32} direction={direction} /> <h3>{direction}</h3>
        </span>
    );
};
