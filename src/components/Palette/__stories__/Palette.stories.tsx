import React from 'react';

import * as icons from '@gravity-ui/icons';
import type {Meta} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem/ShowcaseItem';
import {Icon} from '../../Icon/Icon';
import type {PaletteOption, PaletteProps} from '../Palette';
import {Palette} from '../Palette';

export default {
    title: 'Components/Inputs/Palette',
    component: Palette,
} as Meta;

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

export const Default = () => {
    return <PaletteBase />;
};

export const SingleSelect = () => {
    return <PaletteBase multiple={false} />;
};

export const Disabled = () => {
    return (
        <Showcase>
            <ShowcaseItem title="All disabled">
                <PaletteBase disabled={true} />
            </ShowcaseItem>
            <ShowcaseItem title="Some disabled">
                <PaletteBase
                    options={options.map((option, i) =>
                        i < 5 ? {...option, disabled: true} : option,
                    )}
                />
            </ShowcaseItem>
        </Showcase>
    );
};

export const Sizes = () => {
    return (
        <Showcase>
            <ShowcaseItem title="Size xs">
                <PaletteBase size="xs" />
            </ShowcaseItem>
            <ShowcaseItem title="Size s">
                <PaletteBase size="s" />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <PaletteBase size="m" />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <PaletteBase size="l" />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <PaletteBase size="xl" />
            </ShowcaseItem>
        </Showcase>
    );
};

export const Columns = () => {
    return (
        <Showcase>
            <ShowcaseItem title="1 column">
                <PaletteBase columns={1} />
            </ShowcaseItem>
            <ShowcaseItem title="10 columns">
                <PaletteBase columns={10} />
            </ShowcaseItem>
            <ShowcaseItem title="20 columns">
                <PaletteBase columns={20} />
            </ShowcaseItem>
        </Showcase>
    );
};

const iconsOptions = Object.entries(icons).map(
    ([key, icon]): PaletteOption => ({
        content: <Icon data={icon} />,
        value: key,
        title: key,
    }),
);

export const Icons = () => {
    return <PaletteBase options={iconsOptions} columns={24} />;
};

const alphabetOptions = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(
    (letter): PaletteOption => ({
        value: letter,
    }),
);

export const Alphabet = () => {
    return <PaletteBase options={alphabetOptions} columns={13} />;
};

function PaletteBase(props: PaletteProps) {
    const [value, setValue] = React.useState<string[]>([]);

    return <Palette options={options} value={value} onUpdate={setValue} {...props} />;
}
