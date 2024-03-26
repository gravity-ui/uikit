import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {Card} from '../../Card';
import {ListItem} from '../../List';
import {Flex} from '../../layout';
import {Divider} from '../Divider';

const meta: Meta<typeof Divider> = {
    title: 'Components/Utils/Divider',
    component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

const listItems = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

const disabledControl = {
    table: {
        disable: true,
    },
};

const listItemStyle: React.CSSProperties = {
    padding: '0.5rem',
    textAlign: 'center',
    width: '60px',
};

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
    },
    argTypes: {
        orientation: disabledControl,
    },
    render: (args) => {
        return (
            <Showcase>
                <Card theme="normal" type="container">
                    <Flex direction="column">
                        {listItems.map((value, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    item={value}
                                    itemIndex={index}
                                    active={false}
                                    selected={false}
                                    onActivate={() => {}}
                                    style={listItemStyle}
                                />

                                {index < listItems.length - 1 && <Divider {...args} />}
                            </React.Fragment>
                        ))}
                    </Flex>
                </Card>
            </Showcase>
        );
    },
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
    },
    argTypes: {
        orientation: disabledControl,
    },
    render: (args) => (
        <Showcase>
            <Card theme="normal" type="container">
                <Flex>
                    {listItems.map((value, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                item={value}
                                itemIndex={index}
                                active={false}
                                selected={false}
                                onActivate={() => {}}
                                style={listItemStyle}
                            />

                            {index < listItems.length - 1 && <Divider {...args} />}
                        </React.Fragment>
                    ))}
                </Flex>
            </Card>
        </Showcase>
    ),
};

export const Custom: Story = {
    args: {
        orientation: 'vertical',
        className: 'my-divider',
        style: {borderWidth: '2px'},
    },
    render: (args) => (
        <Showcase>
            <Card theme="normal" type="container">
                <Flex direction={args.orientation === 'vertical' ? 'row' : 'column'}>
                    {listItems.map((value, index) => (
                        <React.Fragment key={index}>
                            <ListItem
                                item={value}
                                itemIndex={index}
                                active={false}
                                selected={false}
                                onActivate={() => {}}
                                style={listItemStyle}
                            />

                            {index < listItems.length - 1 && <Divider {...args} />}
                        </React.Fragment>
                    ))}
                </Flex>
            </Card>
        </Showcase>
    ),
};
