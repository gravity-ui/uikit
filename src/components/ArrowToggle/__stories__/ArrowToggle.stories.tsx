import {Fragment, useState} from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {ArrowToggle} from '../ArrowToggle';
import type {ArrowToggleProps} from '../ArrowToggle';

export default {
    title: 'Components/Utils/ArrowToggle',
    component: ArrowToggle,
} as Meta;

const DefaultTemplate: StoryFn<ArrowToggleProps> = (args) => <ArrowToggle {...args} />;
export const Default = DefaultTemplate.bind({});

const DirectionsTemplate: StoryFn<ArrowToggleProps> = (args) => {
    return (
        <Fragment>
            <ArrowToggle {...args} direction="top" /> top
            <ArrowToggle {...args} direction="right" /> right
            <ArrowToggle {...args} direction="bottom" /> bottom
            <ArrowToggle {...args} direction="left" /> left
        </Fragment>
    );
};

export const Directions = DirectionsTemplate.bind({});

const SizesTemplate: StoryFn<ArrowToggleProps> = (args) => {
    return (
        <Fragment>
            <ArrowToggle {...args} size={10} /> 10
            <ArrowToggle {...args} size={20} /> 20
            <ArrowToggle {...args} size={30} /> 30
            <ArrowToggle {...args} size={40} /> 40
            <ArrowToggle {...args} size={50} /> 50
            <ArrowToggle {...args} size={100} /> 100
        </Fragment>
    );
};

export const Sizes = SizesTemplate.bind({});

export const Interactive: StoryFn<ArrowToggleProps> = (args) => {
    const [directionIndex, setDirectionIndex] = useState(0);
    const directions = ['top', 'left', 'bottom', 'right'] as Array<ArrowToggleProps['direction']>;
    const direction = directions[directionIndex % directions.length];

    return (
        <div>
            <button
                onClick={() => setDirectionIndex(directionIndex + 1)}
                style={{cursor: 'pointer'}}
                aria-label="Arrow"
            >
                <ArrowToggle {...args} size={32} direction={direction} />
            </button>
            <h3>{direction}</h3>
        </div>
    );
};
