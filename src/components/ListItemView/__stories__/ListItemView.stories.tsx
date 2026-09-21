import * as React from 'react';

import {Clock, Envelope, Grip, Star, TrashBin} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Button} from '../../Button';
import {Icon} from '../../Icon';
import {Label} from '../../Label';
import {Text} from '../../Text';
import {Flex} from '../../layout';
import {ListItemView} from '../ListItemView';
import type {ListItemViewProps} from '../ListItemView';

const meta: Meta<typeof ListItemView> = {
    title: 'Components/Data Display/ListItemView',
    component: ListItemView,
    parameters: {
        layout: 'centered',
    },
};

export default meta;

type Story = StoryObj<typeof ListItemView>;

// The view is as wide as its container: every example is given a width of a
// list rather than of the whole page
const Rows = ({children}: React.PropsWithChildren) => (
    <Flex direction="column" width={280}>
        {children}
    </Flex>
);

function SizesExample() {
    return (
        <Rows>
            {(['s', 'm', 'l', 'xl'] as const).map((size) => (
                <ListItemView key={size} size={size} startContent={<Icon data={Envelope} />}>
                    {`Size ${size}`}
                </ListItemView>
            ))}
        </Rows>
    );
}

function SlotsExample() {
    return (
        <Rows>
            <ListItemView startContent={<Icon data={Envelope} size={16} />}>Inbox</ListItemView>
            <ListItemView
                startContent={<Icon data={Star} size={16} />}
                description="Flagged by you"
            >
                Starred
            </ListItemView>
            <ListItemView
                startContent={<Icon data={Clock} size={16} />}
                endContent={<Label>1</Label>}
            >
                Snoozed
            </ListItemView>
        </Rows>
    );
}

function StatesExample() {
    return (
        <Rows>
            <ListItemView>Plain</ListItemView>
            <ListItemView active>Active: the keyboard cursor</ListItemView>
            <ListItemView hovered>Hovered</ListItemView>
            <ListItemView disabled>Disabled</ListItemView>
        </Rows>
    );
}

function SelectionExample() {
    return (
        <Rows>
            <ListItemView selected selectionStyle="highlight">
                Selected: highlight
            </ListItemView>
            <ListItemView selected selectionStyle="check">
                Selected: check
            </ListItemView>
            <ListItemView selectionStyle="check">Not selected: the check is kept</ListItemView>
            <ListItemView selected selectionStyle="none">
                Selected: shown by nothing
            </ListItemView>
        </Rows>
    );
}

function NestingExample() {
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <Rows>
            <ListItemView collapsible collapsed={collapsed} onCollapseChange={setCollapsed}>
                Mailboxes
            </ListItemView>
            {collapsed ? null : (
                <React.Fragment>
                    <ListItemView nestedLevel={1}>Inbox</ListItemView>
                    <ListItemView nestedLevel={1}>Starred</ListItemView>
                </React.Fragment>
            )}
        </Rows>
    );
}

function DragHandleExample() {
    return (
        <Rows>
            {['Intro', 'Verse', 'Chorus'].map((part) => (
                <ListItemView
                    key={part}
                    selectionStyle="check"
                    dragHandle={
                        <span style={{display: 'flex', cursor: 'grab'}} aria-hidden="true">
                            <Icon data={Grip} size={12} />
                        </span>
                    }
                >
                    {part}
                </ListItemView>
            ))}
        </Rows>
    );
}

function CustomElementExample() {
    return (
        <Rows>
            <ListItemView
                component="a"
                componentProps={{
                    href: 'https://gravity-ui.com',
                    target: '_blank',
                    rel: 'noreferrer',
                }}
                startContent={<Icon data={Envelope} size={16} />}
            >
                A row that is a link
            </ListItemView>
            <ListItemView
                component="button"
                componentProps={{type: 'button', onClick: action('onClick')}}
                startContent={<Icon data={TrashBin} size={16} />}
                endContent={
                    <Button view="flat" size="s" onClick={action('onEndContentClick')}>
                        Undo
                    </Button>
                }
            >
                A row that is a button
            </ListItemView>
        </Rows>
    );
}

interface PlaygroundArgs {
    children: React.ReactNode;
    size: ListItemViewProps['size'];
    description: string;
    selectionStyle: ListItemViewProps['selectionStyle'];
    selected: boolean;
    active: boolean;
    hovered: boolean;
    disabled: boolean;
    withStartContent: boolean;
    withEndContent: boolean;
}

export const Default: StoryObj<PlaygroundArgs> = {
    render: function DefaultStory({withStartContent, withEndContent, ...args}) {
        return (
            <Rows>
                <ListItemView
                    {...args}
                    startContent={withStartContent ? <Icon data={Envelope} size={16} /> : undefined}
                    endContent={withEndContent ? <Label>24</Label> : undefined}
                    onClick={action('onClick')}
                />
            </Rows>
        );
    },
    args: {
        children: 'Inbox',
        size: 'm',
        description: '',
        selectionStyle: 'highlight',
        selected: false,
        active: false,
        hovered: false,
        disabled: false,
        withStartContent: true,
        withEndContent: false,
    },
    argTypes: {
        children: {control: 'text', description: 'The content of the row'},
        description: {control: 'text', description: 'The second line of the row'},
        size: {
            control: 'select',
            options: ['s', 'm', 'l', 'xl'],
            description: 'The size of the row',
        },
        selectionStyle: {
            control: 'radio',
            options: ['highlight', 'check', 'none'],
            description: 'How a selected row is shown',
        },
        selected: {control: 'boolean', description: 'Whether the row is selected'},
        active: {control: 'boolean', description: 'The keyboard cursor on the row'},
        hovered: {control: 'boolean', description: 'The hover highlight, forced by the props'},
        disabled: {control: 'boolean', description: 'Whether the row is disabled'},
        withStartContent: {control: 'boolean', description: 'An icon in `startContent`'},
        withEndContent: {control: 'boolean', description: 'A label in `endContent`'},
    },
};

export const Sizes: Story = {render: () => <SizesExample />};

export const Slots: Story = {render: () => <SlotsExample />};

export const States: Story = {render: () => <StatesExample />};

export const Selection: Story = {render: () => <SelectionExample />};

export const Nesting: Story = {render: () => <NestingExample />};

export const DragHandle: Story = {render: () => <DragHandleExample />};

export const CustomElement: Story = {render: () => <CustomElementExample />};

const showcase = [
    ['Sizes', SizesExample],
    ['Slots', SlotsExample],
    ['States', StatesExample],
    ['Selection', SelectionExample],
    ['Nesting', NestingExample],
    ['Drag handle', DragHandleExample],
    ['Custom element', CustomElementExample],
] as const;

export const Showcase: Story = {
    parameters: {layout: 'padded'},
    render: () => (
        <Flex gap={8} wrap>
            {showcase.map(([title, Example]) => (
                <Flex key={title} direction="column" gap={2}>
                    <Text variant="subheader-1">{title}</Text>
                    <Example />
                </Flex>
            ))}
        </Flex>
    ),
};
