import {Check} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {Icon as IconComponent} from '../../Icon';
import {Link} from '../../Link';
import {Label} from '../Label';
import type {LabelProps} from '../Label';

import {LabelShowcase} from './LabelShowcase';

const iconSizeMap: Record<NonNullable<LabelProps['size']>, number> = {
    xs: 12,
    s: 14,
    m: 16,
} as const;

const meta: Meta<typeof Label> = {
    title: 'Components/Data Display/Label',
    component: Label,
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false, // actual color contrast may differ in particular usage
                    },
                ],
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
    args: {
        children: 'Content',
    },
};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <Label {...args} size="xs">
                Size xs
            </Label>
            <Label {...args} size="s">
                Size s
            </Label>
            <Label {...args} size="m">
                Size m
            </Label>
        </Showcase>
    ),
};

export const Theme: Story = {
    render: (args) => (
        <Showcase>
            <Label {...args} theme="normal">
                Normal
            </Label>
            <Label {...args} theme="info">
                Info
            </Label>
            <Label {...args} theme="success">
                Success
            </Label>
            <Label {...args} theme="warning">
                Warning
            </Label>
            <Label {...args} theme="danger">
                Danger
            </Label>
            <Label {...args} theme="utility">
                Utility
            </Label>
            <Label {...args} theme="unknown">
                Unknown
            </Label>
            <Label {...args} theme="clear">
                Clear
            </Label>
        </Showcase>
    ),
};

export const Icon: Story = {
    render: (args) => {
        const size = args.size ?? 'xs';
        const iconSize = iconSizeMap[size];

        return (
            <Showcase>
                <Label {...args} icon={<IconComponent data={Check} size={iconSize} />}>
                    {undefined}
                </Label>
                <Label {...args} icon={<IconComponent data={Check} size={iconSize} />} />
            </Showcase>
        );
    },
    args: {
        ...Default.args,
    },
};

export const Interactive: Story = {
    render: (args) => (
        <Showcase>
            <Label {...args} interactive>
                Interactive
            </Label>
            <Label {...args} onClick={() => {}}>
                With onClick
            </Label>
        </Showcase>
    ),
};

export const Copy: Story = {
    args: {
        ...Default.args,
        type: 'copy',
        copyText: "I'm copied text",
        copyButtonLabel: 'Copy',
    },
};

export const Close: Story = {
    args: {
        ...Default.args,
        type: 'close',
        closeButtonLabel: 'Close',
    },
};

export const Info: Story = {
    args: {
        ...Default.args,
        type: 'info',
    },
};

export const Value: Story = {
    args: {
        ...Default.args,
        children: 'Key',
        value: 'Value',
    },
};

export const LinkWrapper: Story = {
    render: (args) => (
        <Link href="https://gravity-ui.com/" target="_blank">
            <Label {...args} />
        </Link>
    ),
    args: {
        ...Default.args,
    },
};

export const Loading: Story = {
    render: (args) => <Label {...args} loading />,
    args: {
        ...Default.args,
    },
};

export const Width: Story = {
    render: (args) => {
        return (
            <div style={{width: 100, border: '2px dashed gray', overflow: 'hidden', padding: 2}}>
                <p>
                    <Label {...args}>none none none</Label>
                </p>
                <p>
                    <Label {...args} value="none none">
                        none
                    </Label>
                </p>
                <p>
                    <Label {...args} width="auto">
                        auto auto auto
                    </Label>
                </p>
                <p>
                    <Label {...args} width="auto" value="auto auto">
                        auto
                    </Label>
                </p>
            </div>
        );
    },
    args: {
        ...Default.args,
    },
};

export const ShowcaseStory: Story = {
    render: () => <LabelShowcase />,
    name: 'Showcase',
};
