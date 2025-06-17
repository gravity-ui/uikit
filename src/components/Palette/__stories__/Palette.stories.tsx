import {
    ArrowDown,
    ArrowDownFromLine,
    ArrowDownToLine,
    ArrowDownToSquare,
    ArrowLeft,
    ArrowLeftFromLine,
    ArrowLeftToLine,
    ArrowRight,
    ArrowRightArrowLeft,
    ArrowRightFromLine,
    ArrowRightFromSquare,
    ArrowRightToLine,
    ArrowRightToSquare,
    ArrowRotateLeft,
    ArrowRotateRight,
} from '@gravity-ui/icons';
import type {Meta, StoryObj} from '@storybook/react-webpack5';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem/ShowcaseItem';
import {Icon} from '../../Icon/Icon';
import type {PaletteOption} from '../Palette';
import {Palette} from '../Palette';

export default {
    title: 'Components/Inputs/Palette',
    component: Palette,
} as Meta;

type Story = StoryObj<typeof Palette>;

const options: PaletteOption[] = [
    {content: '😊', value: 'value-1', title: 'smiling-face'},
    {content: '❤️', value: 'value-2', title: 'heart'},
    {content: '👍', value: 'value-3', title: 'thumbs-up'},
    {content: '😂', value: 'value-4', title: 'laughing'},
    {content: '😍', value: 'value-5', title: 'hearts-eyes'},
    {content: '😎', value: 'value-6', title: 'cool'},
    {content: '😛', value: 'value-7', title: 'tongue'},
    {content: '😡', value: 'value-8', title: 'angry'},
    {content: '😢', value: 'value-9', title: 'sad'},
    {content: '😯', value: 'value-10', title: 'surprised'},
    {content: '😱', value: 'value-11', title: 'face-screaming'},
    {content: '🤗', value: 'value-12', title: 'smiling-face-with-open-hands'},
    {content: '🤢', value: 'value-13', title: 'nauseated'},
    {content: '🤥', value: 'value-14', title: 'lying-face'},
    {content: '🤩', value: 'value-15', title: 'star-struck'},
    {content: '🤭', value: 'value-16', title: 'face-with-hand-over-mouth'},
    {content: '🤮', value: 'value-17', title: 'vomiting'},
    {content: '🥳', value: 'value-18', title: 'partying'},
    {content: '🥴', value: 'value-19', title: 'woozy'},
    {content: '🥶', value: 'value-20', title: 'cold-face'},
];

export const Default: Story = {args: {options}};

export const SingleSelect: Story = {
    args: {...Default.args, multiple: false},
};

export const Disabled: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="All disabled">
                <Palette {...Default.args} {...args} disabled={true} />
            </ShowcaseItem>
            <ShowcaseItem title="Some disabled">
                <Palette
                    {...args}
                    options={options.map((option, i) =>
                        i < 5 ? {...option, disabled: true} : option,
                    )}
                />
            </ShowcaseItem>
        </Showcase>
    ),
};

export const Sizes: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="Size xs">
                <Palette {...Default.args} {...args} size="xs" />
            </ShowcaseItem>
            <ShowcaseItem title="Size s">
                <Palette {...Default.args} {...args} size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <Palette {...Default.args} {...args} size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <Palette {...Default.args} {...args} size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <Palette {...Default.args} {...args} size="xl" />
            </ShowcaseItem>
        </Showcase>
    ),
};

export const Columns: Story = {
    render: (args) => (
        <Showcase>
            <ShowcaseItem title="1 column">
                <Palette {...Default.args} {...args} columns={1} />
            </ShowcaseItem>
            <ShowcaseItem title="10 columns">
                <Palette {...Default.args} {...args} columns={10} />
            </ShowcaseItem>
            <ShowcaseItem title="20 columns">
                <Palette {...Default.args} {...args} columns={20} />
            </ShowcaseItem>
        </Showcase>
    ),
};

const icons = {
    ArrowDown,
    ArrowDownFromLine,
    ArrowDownToLine,
    ArrowDownToSquare,
    ArrowLeft,
    ArrowLeftFromLine,
    ArrowLeftToLine,
    ArrowRight,
    ArrowRightArrowLeft,
    ArrowRightFromLine,
    ArrowRightFromSquare,
    ArrowRightToLine,
    ArrowRightToSquare,
    ArrowRotateLeft,
    ArrowRotateRight,
};
const iconsOptions = Object.entries(icons).map(
    ([key, icon]): PaletteOption => ({
        content: <Icon data={icon} />,
        value: key,
        title: key,
    }),
);

export const Icons: Story = {
    args: {...Default.args, options: iconsOptions},
};

const alphabetOptions = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(
    (letter): PaletteOption => ({
        value: letter,
    }),
);

export const Alphabet: Story = {
    args: {...Default.args, options: alphabetOptions},
};
