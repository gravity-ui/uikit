import React from 'react';

import {
    ArrowUpRightFromSquare,
    ChevronDown,
    CircleChevronRight,
    Copy,
    Globe,
    Heart,
} from '@gravity-ui/icons';
import {action} from '@storybook/addon-actions';
import type {Meta, StoryObj} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {createCssProperties} from '../../../stories/utils/custom-css-properties';
import {Icon as IconComponent} from '../../Icon/Icon';
import {Button} from '../Button';

import {ButtonViewShowcase} from './ButtonViewShowcase';

const {cssPropertiesParameters, customStoryCSSPropertiesParameters} = createCssProperties({
    'g-button-text-color': {
        control: 'color',
        description: 'Text color',
        example: '#fff',
    },
    'g-button-text-color-hover': {
        control: 'color',
        description: 'Text color on hover',
        example: '#fff',
    },
    'g-button-background-color': {
        control: 'color',
        description: 'Background color',
        example: '#9a2eff',
    },
    'g-button-background-color-hover': {
        control: 'color',
        description: 'Background color on hover',
        example: '#8526de',
    },
    'g-button-border-width': {
        control: 'text',
        example: '5px',
        description: 'Border width',
    },
    'g-button-border-color': {
        control: 'color',
        description: 'Border color',
    },
    'g-button-border-radius': {
        control: 'text',
        example: '40px 20px',
        description: 'Border radius',
    },
    'g-button-border-style': {
        control: 'text',
        example: 'dotted',
        description: 'Border style',
    },
    'g-button-focus-outline-width': {
        control: 'color',
        description: 'Focus outline color',
    },
    'g-button-focus-outline-color': {
        control: 'color',
        description: 'Focus outline color',
        example: '#9a2eff',
    },
    'g-button-focus-outline-style': {
        control: 'text',
        example: '',
        description: 'Focus outline style',
    },
    'g-button-focus-outline-offset': {
        control: 'text',
        example: '4px',
        description: 'Focus outline offset',
    },
    'g-button-height': {
        control: 'text',
        example: '60px',
        description: 'Height, line-height',
    },
    'g-button-padding': {
        control: 'text',
        example: '36px',
        description: 'Side paddings',
    },
    'g-button-font-size': {
        control: 'text',
        example: '20px',
        description: 'Text font size',
    },
    'g-button-icon-size': {
        control: 'text',
        example: '',
        description: 'Icon size',
    },
    'g-button-icon-offset': {
        control: 'text',
        example: '',
        description: 'Icon offset',
    },
});
export default {
    title: 'Components/Inputs/Button',
    component: Button,
    parameters: {
        ...cssPropertiesParameters,
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
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Button',
        onClick: action('onClick'),
        onMouseEnter: action('onMouseEnter'),
        onMouseLeave: action('onMouseLeave'),
        onFocus: action('onFocus'),
        onBlur: action('onBlur'),
    },
};

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
                <Button {...args} extraProps={{'aria-label': 'Icon button inside text'}}>
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
    parameters: {
        ...customStoryCSSPropertiesParameters,
    },
};
