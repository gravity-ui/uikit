import {Gear} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem';
import {Icon} from '../../Icon';
import {ClipboardButton} from '../ClipboardButton';

export default {
    title: 'Components/Utils/ClipboardButton',
    component: ClipboardButton,
    args: {
        text: 'Clipboard text from `<ClipboardButton/>`',
    },
} as Meta;

type Story = StoryObj<typeof ClipboardButton>;

export const Default: Story = {};

export const Size: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="Size xs">
                <ClipboardButton {...args} size="xs" />
            </ShowcaseItem>
            <ShowcaseItem title="Size s">
                <ClipboardButton {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <ClipboardButton {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <ClipboardButton {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <ClipboardButton {...args} size="xl" />
            </ShowcaseItem>
        </Showcase>
    ),
};

export const WithCustomIconPosition: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="start">
                <ClipboardButton {...args} size="xs" iconPosition="start">
                    Copy
                </ClipboardButton>
            </ShowcaseItem>
            <ShowcaseItem title="end">
                <ClipboardButton {...args} size="xs" iconPosition="end">
                    Copy
                </ClipboardButton>
            </ShowcaseItem>
            <ShowcaseItem title="custom">
                <ClipboardButton {...args} size="xs" icon={<Icon data={Gear} size={16} />}>
                    Copy
                </ClipboardButton>
            </ShowcaseItem>
        </Showcase>
    ),
};
