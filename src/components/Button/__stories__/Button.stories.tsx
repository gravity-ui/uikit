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

import {Showcase} from '../../../demo/Showcase';
import {Icon as IconComponent} from '../../Icon/Icon';
import {Button} from '../Button';

import {ButtonViewShowcase} from './ButtonViewShowcase';

type ExtendedForTestsButtonProps = React.ComponentProps<typeof Button> & {isTest?: boolean};

export default {
    title: 'Components/Inputs/Button',
    component: Button,
    parameters: {
        a11y: {
            element: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                    {
                        id: 'duplicate-id',
                        enabled: false,
                        selector: 'defs', // one may use same id in different <defs>
                    },
                ],
            },
        },
    },
} as Meta<ExtendedForTestsButtonProps>;

type Story = StoryObj<ExtendedForTestsButtonProps>;

export const Default: Story = {args: {children: 'Button'}};

export const View: Story = {
    render: (args) => <ButtonViewShowcase {...args} />,
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
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
        </Showcase>
    ),
};

export const Icon: Story = {
    render: (args) => (
        <Showcase>
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
            <Button {...args} title="Copy">
                <IconComponent data={Copy} />
            </Button>
            {args.isTest && (
                <Button {...args}>
                    <IconComponent size={20} data={Globe} />
                    Both bigger icons
                    <IconComponent size={20} data={ChevronDown} />
                </Button>
            )}
        </Showcase>
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
    args: {
        ...Default.args,
    },
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
    args: {
        ...Default.args,
    },
    render: (args) => {
        return (
            <Showcase>
                <Button {...args}>Round</Button>
                <Button {...args} pin="circle-circle">
                    Circle
                </Button>
                <Button {...args} pin="brick-brick">
                    Brick
                </Button>
            </Showcase>
        );
    },
};

export const Link: Story = {
    args: {
        ...Default.args,
        children: ['Link Button', <IconComponent key="icon" data={ArrowUpRightFromSquare} />],
        href: 'https://gravity-ui.com',
        target: '_blank',
    },
    name: 'As Link',
};

export const InsideText: Story = {
    args: {
        ...Default.args,
    },
    render: (args) => {
        return (
            <div>
                Lorem ipsum
                <br />
                <Button {...args} /> dolor
                <br />
                sit{' '}
                <Button {...args}>
                    <IconComponent data={Globe} />
                </Button>{' '}
                amet
            </div>
        );
    },
    name: 'Inside Text',
};

export const Custom: Story = {
    args: {
        children: 'Fancy Button',
    },
    render: (args) => (
        <React.Fragment>
            <style>
                {`.g-root {
                    --g-button-text-color: #fff;
                    --g-button-text-color-hover: #fff;
                    --g-button-background-color: #9a2eff;
                    --g-button-background-color-hover: #8526de;
                    --g-button-border-width: 5px;
                    --g-button-border-style: dotted;
                    --g-button-height: 60px;
                    --g-button-padding: 36px;
                    --g-button-font-size: 20px;
                    --g-button-border-radius: 40px 20px;
                    --g-button-focus-outline-color: #9a2eff;
                    --g-button-focus-outline-offset: 4px;
                }`}
            </style>
            <Button {...args} />
        </React.Fragment>
    ),
};
