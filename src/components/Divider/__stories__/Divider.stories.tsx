import * as React from 'react';

import {Check as CheckIcon} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {Card} from '../../Card';
import {Icon} from '../../Icon';
import {Flex} from '../../layout';
import {Divider} from '../Divider';
import type {DividerProps} from '../Divider';

const meta: Meta<typeof Divider> = {
    title: 'Components/Utils/Divider',
    component: Divider,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'aria-allowed-attr', // https://github.com/gravity-ui/uikit/issues/1336
                        enabled: false,
                    },
                    {
                        id: 'aria-required-parent', // https://github.com/gravity-ui/uikit/issues/1336
                        enabled: false,
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Divider>;

const listItems = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

const disabledControl = {
    table: {
        disable: true,
    },
};

const itemStyle: React.CSSProperties = {
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
        style: disabledControl,
        qa: disabledControl,
        className: disabledControl,
        align: disabledControl,
    },
    render: (args) => {
        return (
            <Showcase>
                <Card theme="normal" type="container">
                    <Flex direction="column">
                        {listItems.map((value, index) => (
                            <React.Fragment key={index}>
                                <div style={itemStyle}>{value}</div>
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
        style: disabledControl,
        qa: disabledControl,
        className: disabledControl,
        align: disabledControl,
    },
    render: (args) => (
        <Showcase>
            <Card theme="normal" type="container">
                <Flex>
                    {listItems.map((value, index) => (
                        <React.Fragment key={index}>
                            <div style={itemStyle}>{value}</div>
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
        className: 'custom-divider',
    },
    argTypes: {
        align: disabledControl,
    },
    render: (args) => (
        <Showcase>
            <style>
                {`.g-root {
                  --g-divider-color: #027bf3;
                  --g-divider-size: 2px;
                }`}
            </style>
            <Card theme="normal" type="container">
                <Flex direction={args.orientation === 'vertical' ? 'row' : 'column'}>
                    {listItems.map((value, index) => (
                        <React.Fragment key={index}>
                            <div style={itemStyle}>{value}</div>
                            {index < listItems.length - 1 && <Divider {...args} />}
                        </React.Fragment>
                    ))}
                </Flex>
            </Card>
        </Showcase>
    ),
};

const alignCases: Array<NonNullable<DividerProps['align']>> = ['start', 'center', 'end'];

export const WithContent: Story = {
    args: {
        orientation: 'horizontal',
    },
    render: (args) => (
        <Showcase>
            <Flex
                direction={args.orientation === 'horizontal' ? 'column' : 'row'}
                height={args.orientation === 'vertical' ? 200 : undefined}
                width={400}
                gap={5}
            >
                {alignCases.map((align, index) => (
                    <Divider {...args} align={align} key={index}>
                        {align}
                    </Divider>
                ))}

                <Divider align="center" {...args}>
                    <Icon data={CheckIcon} size={16} />
                </Divider>
            </Flex>
        </Showcase>
    ),
};

WithContent.storyName = 'With content';
