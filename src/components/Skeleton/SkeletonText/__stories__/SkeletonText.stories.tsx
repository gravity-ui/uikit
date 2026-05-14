import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Text} from '../../../Text';
import {TEXT_VARIANTS} from '../../../Text/text/text';
import {Flex} from '../../../layout';
import {SkeletonText} from '../SkeletonText';

const ANIMATION_VALUES = ['gradient', 'pulse', 'none'];

const MULTILINE_VARIANTS: Array<(typeof TEXT_VARIANTS)[number]> = [
    'display-2',
    'header-1',
    'body-1',
    'caption-1',
];

export default {
    title: 'Components/Feedback/Skeleton/SkeletonText',
    component: SkeletonText,
    args: {
        variant: 'body-1',
        width: '100%',
        lines: 1,
        animation: 'gradient',
    },
    argTypes: {
        variant: {
            control: {type: 'select'},
            options: [...TEXT_VARIANTS, 'inherit'],
        },
        lines: {control: {type: 'number', min: 1}},
        lastLineWidth: {control: {type: 'text'}},
        animation: {control: {type: 'select'}, options: ANIMATION_VALUES},
    },
} as Meta<typeof SkeletonText>;

type Story = StoryObj<typeof SkeletonText>;

export const Default: Story = {
    render: (args) => (
        <div style={{width: 320}}>
            <SkeletonText {...args} />
        </div>
    ),
};

export const Multiline: Story = {
    args: {lines: 3, width: '100%', lastLineWidth: '60%', animation: 'gradient'},
    render: (args) => (
        <div style={{width: 320}}>
            <SkeletonText {...args} />
        </div>
    ),
};

export const Showcase: Story = {
    parameters: {controls: {disable: true}},
    render: (args) => (
        <Flex direction="column" gap={2} style={{width: 320}}>
            {TEXT_VARIANTS.map((variant) => (
                <Flex key={variant} alignItems="center" gap={2}>
                    <Text variant="caption-1" color="secondary" style={{width: 100, flexShrink: 0}}>
                        {variant}
                    </Text>
                    <SkeletonText {...args} variant={variant} />
                </Flex>
            ))}
            <Flex direction="column" gap={6} style={{marginTop: 16}}>
                {MULTILINE_VARIANTS.map((variant) => (
                    <div key={`multiline-${variant}`}>
                        <Text
                            variant="caption-1"
                            color="secondary"
                            style={{display: 'block', marginBottom: 4}}
                        >
                            {variant} (multiline)
                        </Text>
                        <SkeletonText {...args} variant={variant} lines={3} lastLineWidth="60%" />
                    </div>
                ))}
            </Flex>
        </Flex>
    ),
};
