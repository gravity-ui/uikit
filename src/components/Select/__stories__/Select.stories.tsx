import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Select} from '..';
import {Button} from '../../Button';

import {SelectPopupWidthShowcase} from './SelectPopupWidthShowcase';
import {SelectShowcase} from './SelectShowcase';
import {UseSelectOptionsShowcase} from './UseSelectOptionsShowcase';

const meta: Meta<typeof Select> = {
    title: 'Components/Inputs/Select',
    component: Select,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                        selector: '.g-select-control__placeholder', // todo: https://github.com/gravity-ui/uikit/issues/1334
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default = {
    render: (args) => (
        <Select {...args} title="Select sample">
            <Select.Option value="val1" content="Value1" />
            <Select.Option value="val2" content="Value2" />
            <Select.Option value="val3" content="Value3" />
            <Select.Option value="val4" content="Value4" />
        </Select>
    ),
} satisfies Story;

export const Showcase = {
    render: (args) => <SelectShowcase {...args} />,
    args: {
        view: 'normal',
        size: 'm',
        multiple: false,
        filterable: false,
        disabled: false,
        placeholder: 'Values',
        label: '',
        hasClear: false,
    },
} satisfies Story;

export const PopupWidth = {
    render: (args) => <SelectPopupWidthShowcase {...args} />,
} satisfies Story;

export const UseSelectOptions = {
    render: () => <UseSelectOptionsShowcase />,
    parameters: {
        controls: {
            disabled: true,
        },
    },
} satisfies Story;

export const Form = {
    render: (args) => (
        <form
            id="form"
            onSubmit={(event) => {
                event.preventDefault();
                alert(JSON.stringify([...new FormData(event.currentTarget).entries()]));
            }}
        >
            <label style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                Value: {Default.render({name: 'value', ...args})}
            </label>
            <div style={{marginBlockStart: '1em', display: 'flex', gap: 8}}>
                <Button type="submit" view="action">
                    Submit
                </Button>
                <Button type="reset">Reset</Button>
            </div>
        </form>
    ),
} satisfies Story;
