import React from 'react';

import {
    ArrowUpRightFromSquare,
    ChevronDown,
    CircleChevronRight,
    Copy,
    Globe,
    Heart,
} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react';

import {StoryLayout} from '../../../demo/StoryLayout/StoryLayout';
import {Icon as IconComponent} from '../../Icon/Icon';
import {Button} from '../Button';

import {ButtonViewShowcase} from './ButtonViewShowcase';

export default {
    title: 'Components/Inputs/Button',
    component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {args: {children: 'Button'}};

export const View: Story = {
    render: (args) => <ButtonViewShowcase {...args} />,
};

export const Size: Story = {
    render: (args) => (
        <StoryLayout>
            <Button {...args} size="xs">
                Size xs
            </Button>
            <Button {...args} size="s">
                Size s
            </Button>
            <Button {...args} size="m">
                Size m
            </Button>
            <Button {...args} size="l">
                Size l
            </Button>
            <Button {...args} size="xl">
                Size xl
            </Button>
        </StoryLayout>
    ),
};

export const Icon: Story = {
    render: (args) => (
        <StoryLayout>
            <Button {...args}>No icon</Button>
            <Button {...args}>
                <IconComponent data={Heart} />
                Start
            </Button>
            <Button {...args}>
                End
                <IconComponent data={CircleChevronRight} />
            </Button>
            <Button {...args}>
                <IconComponent data={Globe} />
                Both
                <IconComponent data={ChevronDown} />
            </Button>
            <Button {...args}>
                <IconComponent data={Copy} />
            </Button>
        </StoryLayout>
    ),
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
};

export const Selected: Story = {
    args: {
        ...Default.args,
        selected: true,
    },
};

export const Loading: Story = {
    args: {
        ...Default.args,
        loading: true,
    },
};

export const Width: Story = {
    render: (args) => {
        return (
            <div style={{width: 100, border: '2px dashed gray', overflow: 'hidden', padding: 2}}>
                <p>
                    <Button {...args}>none none none</Button>
                </p>
                <p>
                    <Button {...args} width="auto">
                        auto auto auto
                    </Button>
                </p>
                <p>
                    <Button {...args} width="max">
                        max
                    </Button>
                </p>
            </div>
        );
    },
};

export const Pin: Story = {
    render: (args) => {
        return (
            <StoryLayout>
                <Button {...args}>Round</Button>
                <Button {...args} pin="circle-circle">
                    Circle
                </Button>
                <Button {...args} pin="brick-brick">
                    Brick
                </Button>
            </StoryLayout>
        );
    },
};

export const Link: Story = {
    args: {
        children: ['Link Button', <IconComponent key="icon" data={ArrowUpRightFromSquare} />],
        href: 'https://gravity-ui.com',
        target: '_blank',
    },
    name: 'As Link',
};
