import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../../../../Button';
import {RadioButton} from '../../../../RadioButton';
import {Text} from '../../../../Text';
import {Flex} from '../../../../layout';
import type {ListItemExpandIconProps} from '../ListItemExpandIcon';
import {ListItemExpandIcon} from '../ListItemExpandIcon';

const meta: Meta<typeof ListItemExpandIcon> = {
    title: 'Lab/useList/ListItemExpandIcon',
    component: ListItemExpandIcon,
};

export default meta;

type Story = StoryObj<typeof ListItemExpandIcon>;

export const Default = {
    render: (args) => (
        <Flex gap="5">
            <Flex direction="column" gap="2">
                <Text>Position: start</Text>
                <Flex gap="2">
                    <ListItemExpandIcon {...args} expanded={true} />
                    <ListItemExpandIcon {...args} expanded={false} />
                </Flex>
            </Flex>
            <Flex direction="column" gap="2">
                <Text>Position: start</Text>
                <Flex gap="2">
                    <ListItemExpandIcon {...args} expanded={true} position="end" />
                    <ListItemExpandIcon {...args} expanded={false} position="end" />
                </Flex>
            </Flex>
        </Flex>
    ),
} satisfies Story;

const InsideButtonExample = (props: ListItemExpandIconProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const [position, setPosition] = React.useState<'start' | 'end'>('start');

    return (
        <Flex direction="column" gap="3">
            <Flex gap="3" alignItems="center">
                <Text>Icon position: </Text>
                <RadioButton
                    size="m"
                    value={position}
                    onUpdate={setPosition}
                    options={[
                        {value: 'start', content: 'Start'},
                        {value: 'end', content: 'End'},
                    ]}
                />
            </Flex>

            <Text>Click on button to change state:</Text>

            <Button onClick={() => setExpanded((x) => !x)}>
                <ListItemExpandIcon {...props} expanded={expanded} position={position} />
            </Button>
        </Flex>
    );
};

export const InsideButton = {
    render: InsideButtonExample,
} satisfies Story;
