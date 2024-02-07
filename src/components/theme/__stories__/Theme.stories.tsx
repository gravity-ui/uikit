import React from 'react';

import type {Meta, StoryObj} from '@storybook/react';

import {Button} from '../../Button';
import {Text} from '../../Text';
import {ThemeProvider} from '../ThemeProvider';
import {useDirection} from '../useDirection';

const meta: Meta<typeof ThemeProvider> = {
    title: 'Components/Utils/ThemeProvider',
    component: ThemeProvider,
    tags: ['nodocs'],
    argTypes: {
        theme: {
            options: ['none', 'light', 'dark', 'light-hc', 'dark-hc', 'system'],
            control: {
                type: 'select',
            },
            mapping: {
                none: undefined,
            },
        },
        direction: {
            options: ['none', 'ltr', 'rtl'],
            control: {
                type: 'radio',
            },
            mapping: {
                none: undefined,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

function ScopedComponent() {
    return (
        <div style={{transform: 'scaleX(var(--g-flow-direction))'}}>
            <Button>{`current direction: ${useDirection()}`}</Button>
        </div>
    );
}

export const Scoped: Story = {
    render: function ThemeScoped(props) {
        return (
            <div>
                <ScopedComponent />

                <ThemeProvider {...props}>
                    <div style={{border: '1px red dotted', padding: 10, marginBlockStart: 10}}>
                        <Text>Inside scoped theme provider</Text>
                        <ScopedComponent />
                    </div>
                </ThemeProvider>
            </div>
        );
    },
    argTypes: {
        scoped: {
            table: {
                disable: true,
            },
        },
    },
};
