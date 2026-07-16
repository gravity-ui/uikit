import * as React from 'react';

import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Slider} from '../../Slider';
import {Flex} from '../../layout';
import {Ellipsis} from '../Ellipsis';

const meta: Meta<typeof Ellipsis> = {
    title: 'Components/Data Display/Ellipsis',
    component: Ellipsis,
    args: {
        children: 'a-very-long-long-text-that-should-be-truncated-in-somewhere.tar.gz',
        position: 'end',
        offsetStart: 0,
        offsetEnd: 0,
        separator: '',
    },
    argTypes: {
        position: {
            control: {type: 'inline-radio'},
            options: ['start', 'center', 'end'],
        },
        offsetStart: {control: {type: 'number', min: 0}},
        offsetEnd: {control: {type: 'number', min: 0}},
        separator: {control: {type: 'text'}},
        children: {control: {type: 'text'}},
    },
};

export default meta;

type Story = StoryObj<typeof Ellipsis>;

const MIN_WIDTH = 0;
const MAX_WIDTH = 500;
const DEFAULT_WIDTH = 240;

const WithWidthControl = ({
    children,
    defaultWidth = DEFAULT_WIDTH,
}: {
    children: (width: number) => React.ReactNode;
    defaultWidth?: number;
}) => {
    const [width, setWidth] = React.useState(defaultWidth);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `92px ${MAX_WIDTH}px`,
                gridTemplateRows: 'auto auto',
                gap: 8,
            }}
        >
            <span />
            {children(width)}
            <span style={{fontVariantNumeric: 'tabular-nums', marginTop: 30}}>
                width: {width}px
            </span>
            <Slider
                min={MIN_WIDTH}
                max={MAX_WIDTH}
                step={1}
                value={width}
                onUpdate={(v) => setWidth(v as number)}
                aria-label="Wrapper width"
            />
        </div>
    );
};

export const Default: Story = {
    render: (args) => (
        <div
            style={{
                resize: 'horizontal',
                overflow: 'auto',
                width: DEFAULT_WIDTH,
                paddingInline: 12,
            }}
        >
            <Ellipsis {...args} style={{width: '100%'}} />
        </div>
    ),
};

export const Positions: Story = {
    render: (args) => (
        <WithWidthControl>
            {(width) => (
                <Flex direction="column" gap={2}>
                    {(['start', 'center', 'end'] as const).map((position) => (
                        <Flex key={position} direction="column" gap={0.5}>
                            <span style={{color: 'var(--g-color-text-secondary)'}}>
                                position=&quot;{position}&quot;
                            </span>
                            <div style={{width}}>
                                <Ellipsis {...args} position={position} style={{width: '100%'}} />
                            </div>
                        </Flex>
                    ))}
                </Flex>
            )}
        </WithWidthControl>
    ),
};

export const WithSeparator: Story = {
    args: {
        children: 'path/to/some/deeply/nested/folder/file-name.tsx',
        separator: '/',
        offsetStart: 1,
        offsetEnd: 1,
        position: 'center',
    },
    render: (args) => (
        <WithWidthControl>
            {(width) => (
                <div style={{width}}>
                    <Ellipsis {...args} style={{width: '100%'}} />
                </div>
            )}
        </WithWidthControl>
    ),
};

export const WithMultipleSeparators: Story = {
    args: {
        children: 'src.components.Ellipsis/Ellipsis-tsx',
        separator: ['.', '/', '-'],
        offsetStart: 1,
        offsetEnd: 1,
        position: 'center',
    },
    render: (args) => (
        <WithWidthControl>
            {(width) => (
                <div style={{width}}>
                    <Ellipsis {...args} style={{width: '100%'}} />
                </div>
            )}
        </WithWidthControl>
    ),
};
