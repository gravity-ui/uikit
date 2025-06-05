import {
    ArrowUpRightFromSquare,
    ChevronDown,
    CircleChevronRight,
    Copy,
    Globe,
    Heart,
} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {action} from 'storybook/actions';

import {Showcase} from '../../../demo/Showcase';
import {Icon as IconComponent} from '../../Icon/Icon';
import type {IconProps} from '../../Icon/Icon';
import {Button} from '../Button';
import type {ButtonButtonProps, ButtonLinkProps, ButtonSize} from '../Button';
import {BUTTON_ICON_SIZE_MAP} from '../constants';

import {ButtonViewShowcase} from './ButtonViewShowcase';

function IconWithSize({data, size = 'm'}: Omit<IconProps, 'size'> & {size?: ButtonSize}) {
    return <IconComponent data={data} size={BUTTON_ICON_SIZE_MAP[size]} />;
}

IconWithSize.displayName = 'Icon';

export default {
    title: 'Components/Inputs/Button',
    component: Button,
    parameters: {
        a11y: {
            context: '#storybook-root',
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
    render: (args) => <ButtonViewShowcase {...(args as ButtonButtonProps)} />,
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
                <IconWithSize data={Heart} size={args.size} />
                Start
            </Button>
            <Button {...args}>
                End
                <IconWithSize data={CircleChevronRight} size={args.size} />
            </Button>
            <Button {...args}>
                <IconWithSize data={Globe} size={args.size} />
                Both
                <IconWithSize data={ChevronDown} size={args.size} />
            </Button>
            <Button {...args} title="Copy">
                <IconWithSize data={Copy} size={args.size} />
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
    render: (args) => (
        <Button {...args}>
            Link Button
            <IconWithSize data={ArrowUpRightFromSquare} size={args.size} />
        </Button>
    ),
    args: {
        ...Default.args,
        href: 'https://gravity-ui.com',
        target: '_blank',
    } as ButtonLinkProps,
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
                <Button {...args} aria-label="Icon button inside text">
                    <IconWithSize data={Globe} size={args.size} />
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
        <Button
            {...args}
            style={{
                '--g-button-text-color': '#fff',
                '--g-button-text-color-hover': '#fff',
                '--g-button-background-color': '#9a2eff',
                '--g-button-background-color-hover': '#8526de',
                '--g-button-border-width': '5px',
                '--g-button-border-style': 'dotted',
                '--g-button-height': '60px',
                '--g-button-padding': '36px',
                '--g-button-font-size': '20px',
                '--g-button-border-radius': '40px 20px',
                '--g-button-focus-outline-color': '#9a2eff',
                '--g-button-focus-outline-offset': '4px',
                ...args.style,
            }}
        />
    ),
};
