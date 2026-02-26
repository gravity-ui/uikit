import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Flex} from '../../layout';
import {Suggest} from '../Suggest';

const meta: Meta<typeof Suggest> = {
    title: 'Components/Inputs/Suggest',
    component: Suggest,
    argTypes: {},
    parameters: {},
};

export default meta;

type Story = StoryObj<typeof Suggest>;

export const Default = {
    render: () => (
        <Flex gap={2}>
            <StorySuggest />
        </Flex>
    ),
} satisfies Story;

type TOption = {
    value: string;
    content: string;
};

function StorySuggest() {
    const [filter, setFilter] = React.useState('');

    return (
        <Suggest<TOption>
            filter={filter}
            onFilterUpdate={setFilter}
            items={[
                {value: '1', content: 'Content 1'},
                {value: '2', content: 'Content 2'},
                {value: '3', content: 'Content 3'},
                {value: '4', content: 'Disabled 4', disabled: true},
            ]}
            renderItem={(item, isActive) => (
                <div style={{color: item.disabled ? 'gray' : 'black'}}>
                    {item.value}
                    {isActive ? '!!!' : undefined}
                </div>
            )}
            onItemClick={(item) => console.log('!!!', item)}
        />
    );
}
