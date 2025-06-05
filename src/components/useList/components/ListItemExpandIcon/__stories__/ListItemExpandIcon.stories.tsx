import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../../../../Button';
import type {ListItemExpandIconProps} from '../ListItemExpandIcon';
import {ListItemExpandIcon} from '../ListItemExpandIcon';

const meta: Meta<typeof ListItemExpandIcon> = {
    title: 'Lab/useList/ListItemExpandIcon',
    component: ListItemExpandIcon,
};

export default meta;

type Story = StoryObj<typeof ListItemExpandIcon>;

const DefaultExample = (props: ListItemExpandIconProps) => {
    return <ListItemExpandIcon {...props} />;
};

export const Default = {
    render: DefaultExample,
} satisfies Story;

const InsideButtonExample = (props: ListItemExpandIconProps) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Button aria-label="Toggle Button" onClick={() => setExpanded((x) => !x)}>
            <Button.Icon>
                <ListItemExpandIcon {...props} expanded={expanded} />
            </Button.Icon>
        </Button>
    );
};

export const InsideButton = {
    render: InsideButtonExample,
} satisfies Story;
