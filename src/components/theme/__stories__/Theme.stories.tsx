import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Button} from '../../Button';
import {Dialog} from '../../Dialog';
import {Select} from '../../Select';
import {Text} from '../../Text';
import {Tooltip} from '../../Tooltip';
import {ThemeProvider} from '../ThemeProvider';
import {useDirection} from '../useDirection';

const meta: Meta<typeof ThemeProvider> = {
    title: 'Components/Utils/ThemeProvider',
    component: ThemeProvider,
    tags: ['nodocs'],
    parameters: {
        controls: {
            disable: true,
        },
    },
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

function ScopedComponent() {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <Tooltip content="tooltip">
                <Button
                    onClick={() => {
                        setOpen(!open);
                    }}
                >{`current direction: ${useDirection()}`}</Button>
            </Tooltip>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Dialog.Header caption="Dialog.Header" />
                <Dialog.Body>
                    Dialog.Body
                    <Select>
                        <Select.Option value="one">One</Select.Option>
                        <Select.Option value="two">Two</Select.Option>
                        <Select.Option value="three">Three</Select.Option>
                    </Select>
                </Dialog.Body>
            </Dialog>
        </div>
    );
}

export const Scoped: Story = {
    render: function ThemeScoped(props) {
        const style: React.CSSProperties = {
            border: '1px red dotted',
            padding: 10,
            height: '100%',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 10,
        };
        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '300px 300px',
                    gap: 10,
                }}
            >
                <ThemeProvider {...props} theme="light" direction="rtl">
                    <div style={style}>
                        <Text>Inside scoped theme provider (light)</Text>
                        <ScopedComponent />
                    </div>
                </ThemeProvider>
                <ThemeProvider {...props} theme="dark">
                    <div style={style}>
                        <Text>Inside scoped theme provider (dark)</Text>
                        <ScopedComponent />
                    </div>
                </ThemeProvider>
                <ThemeProvider {...props} theme="light-hc">
                    <div style={style}>
                        <Text>Inside scoped theme provider (light-hc)</Text>
                        <ScopedComponent />
                    </div>
                </ThemeProvider>
                <ThemeProvider {...props} theme="dark-hc" direction="rtl">
                    <div style={style}>
                        <Text>Inside scoped theme provider (dark-hc)</Text>
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
