import * as React from 'react';

import {Gear} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Button} from '../../Button';
import {Icon} from '../../Icon';
import type {TableColumnSetupItem, TableColumnSetupProps} from '../TableColumnSetup';
import {TableColumnSetup} from '../TableColumnSetup';

export default {
    title: 'Components/Data Display/TableColumnSetup',
    component: TableColumnSetup,
    parameters: {
        docs: {
            description: {
                component: 'Component for configuring table columns visibility and order',
            },
        },
    },
    argTypes: {
        sortable: {
            control: 'boolean',
            description: 'Enable drag and drop sorting of columns',
        },
        hideApplyButton: {
            control: 'boolean',
            description: 'When to apply changes: via Apply button or immediately',
        },
        showStatus: {
            control: 'boolean',
            description: 'Show selected/total columns count in switcher button',
        },
        popupPlacement: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Popup placement relative to trigger',
        },
        popupWidth: {
            control: 'number',
            description: 'Width of the popup in pixels',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the switcher button',
        },
    },
} as Meta<TableColumnSetupProps>;

type Story = StoryObj<TableColumnSetupProps>;

// Sample data for stories
const basicItems: TableColumnSetupItem[] = [
    {
        id: 'name',
        title: 'Name',
        selected: true,
        required: true,
    },
    {
        id: 'email',
        title: 'Email',
        selected: true,
    },
    {
        id: 'phone',
        title: 'Phone',
        selected: false,
    },
    {
        id: 'location',
        title: 'Location',
        selected: true,
    },
    {
        id: 'date',
        title: 'Date Created',
        selected: false,
    },
];

const stickyItems: TableColumnSetupItem[] = [
    {
        id: 'checkbox',
        title: 'Selection',
        selected: true,
        required: true,
        sticky: 'left',
    },
    {
        id: 'name',
        title: 'Name',
        selected: true,
        sticky: 'left',
    },
    {
        id: 'email',
        title: 'Email',
        selected: true,
    },
    {
        id: 'phone',
        title: 'Phone',
        selected: false,
    },
    {
        id: 'location',
        title: 'Location',
        selected: true,
    },
    {
        id: 'date',
        title: 'Date Created',
        selected: false,
    },
    {
        id: 'actions',
        title: 'Actions',
        selected: true,
        sticky: 'right',
    },
];

const manyItems: TableColumnSetupItem[] = [
    {id: 'id', title: 'ID', selected: true, required: true},
    {id: 'name', title: 'Full Name', selected: true},
    {id: 'firstName', title: 'First Name', selected: false},
    {id: 'lastName', title: 'Last Name', selected: false},
    {id: 'email', title: 'Email Address', selected: true},
    {id: 'phone', title: 'Phone Number', selected: false},
    {id: 'mobile', title: 'Mobile Phone', selected: false},
    {id: 'address', title: 'Address', selected: false},
    {id: 'city', title: 'City', selected: true},
    {id: 'state', title: 'State/Province', selected: false},
    {id: 'country', title: 'Country', selected: true},
    {id: 'zipCode', title: 'ZIP Code', selected: false},
    {id: 'company', title: 'Company', selected: false},
    {id: 'position', title: 'Position', selected: false},
    {id: 'department', title: 'Department', selected: false},
    {id: 'salary', title: 'Salary', selected: false},
    {id: 'startDate', title: 'Start Date', selected: true},
    {id: 'endDate', title: 'End Date', selected: false},
    {id: 'status', title: 'Status', selected: true},
    {id: 'notes', title: 'Notes', selected: false},
];

export const Default: Story = {
    args: {
        items: basicItems,
        onUpdate: action('onUpdate'),
    },
};

export const Sortable: Story = {
    args: {
        items: basicItems,
        sortable: true,
        onUpdate: action('onUpdate'),
    },
};

export const WithStickyColumns: Story = {
    args: {
        items: stickyItems,
        sortable: true,
        onUpdate: action('onUpdate'),
    },
};

export const WithStatus: Story = {
    args: {
        items: basicItems,
        showStatus: true,
        onUpdate: action('onUpdate'),
    },
};

export const ImmediateMode: Story = {
    render: (args) => {
        const [items, setItems] = React.useState(args.items);

        return (
            <div>
                <p>Current selected columns: {items.filter((item) => item.selected).length}</p>
                <p>Changes are applied immediately without Apply button</p>
                <TableColumnSetup
                    {...args}
                    items={items}
                    hideApplyButton
                    onUpdate={(updatedItems) => {
                        action('onUpdate')(updatedItems);
                        setItems(updatedItems);
                    }}
                />
            </div>
        );
    },
    args: {
        items: basicItems,
    },
};

export const Disabled: Story = {
    args: {
        items: basicItems,
        disabled: true,
        onUpdate: action('onUpdate'),
    },
};

export const WithCustomSwitcher: Story = {
    args: {
        items: basicItems,
        renderSwitcher: ({onClick, onKeyDown}) => (
            <Button onClick={onClick} onKeyDown={onKeyDown} view="outlined">
                <Icon data={Gear} />
                Configure Columns
            </Button>
        ),
        onUpdate: action('onUpdate'),
    },
};

export const PopupWidth: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="Default width">
                <TableColumnSetup {...args} />
            </ShowcaseItem>
            <ShowcaseItem title="Custom width (300px)">
                <TableColumnSetup {...args} popupWidth={300} />
            </ShowcaseItem>
            <ShowcaseItem title="Fit width">
                <TableColumnSetup {...args} popupWidth="fit" />
            </ShowcaseItem>
        </Showcase>
    ),
    args: {
        items: basicItems,
        onUpdate: action('onUpdate'),
    },
};

export const WithComplexTitles: Story = {
    args: {
        items: [
            {
                id: 'name',
                title: (
                    <span>
                        <strong>Name</strong> (Required)
                    </span>
                ),
                selected: true,
                required: true,
            },
            {
                id: 'email',
                title: <span>📧 Email Address</span>,
                selected: true,
            },
            {
                id: 'phone',
                title: <span>📞 Phone Number</span>,
                selected: false,
            },
            {
                id: 'location',
                title: <span>📍 Location</span>,
                selected: true,
            },
            {
                id: 'date',
                title: <span style={{color: 'var(--g-color-text-secondary)'}}>Date Created</span>,
                selected: false,
            },
        ],
        onUpdate: action('onUpdate'),
    },
};

export const Playground: Story = {
    args: {
        items: manyItems,
        sortable: true,
        showStatus: true,
        hideApplyButton: false,
        popupWidth: 280,
        onUpdate: action('onUpdate'),
    },
};
