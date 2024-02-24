import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Breadcrumbs} from '../Breadcrumbs';

const names = ['Region', 'Country', 'Province', 'City', 'District', 'Street', 'House', 'Apartment'];
const action = () => {};
const items = names.map((text) => ({text, action}));

export default {
    title: 'Components/Basic/BreadCrumbs',
    id: 'components/BreadCrumbs',
    argTypes: {
        depth: {
            control: {
                type: 'range',
                min: 1,
                max: items.length,
                step: 1,
            },
            defaultValue: items.length,
        },
        containerWidth: {
            control: {
                type: 'range',
                min: 10,
                max: 100,
                step: 1,
            },
            defaultValue: 100,
        },

        firstDisplayedItemsCount: {
            control: {
                type: 'inline-radio',
                options: [0, 1],
            },
            defaultValue: 1,
        },
        lastDisplayedItemsCount: {
            control: {
                type: 'inline-radio',
                options: [1, 2],
            },
            defaultValue: 1,
        },
    },
    parameters: {
        order: -100,
    },
} as Meta;

export const Playground: Story = (args) => {
    const style = {background: '#ddd', overflow: 'hidden', width: `${args.containerWidth}%`};

    return (
        <div style={style}>
            <Breadcrumbs
                items={items.slice(0, args.depth)}
                firstDisplayedItemsCount={args.firstDisplayedItemsCount}
                lastDisplayedItemsCount={args.lastDisplayedItemsCount}
            />
        </div>
    );
};
Playground.storyName = 'BreadCrumbs';
