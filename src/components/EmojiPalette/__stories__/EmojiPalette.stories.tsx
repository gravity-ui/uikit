import React from 'react';

import * as icons from '@gravity-ui/icons';
import type {Meta} from '@storybook/react';

import {Showcase} from '../../../demo/Showcase';
import {ShowcaseItem} from '../../../demo/ShowcaseItem/ShowcaseItem';
import {Icon} from '../../Icon/Icon';
import type {EmojiOption, EmojiPaletteProps, EmojiValue} from '../EmojiPalette';
import {EmojiPalette} from '../EmojiPalette';

export default {
    title: 'Components/Inputs/EmojiPalette',
    component: EmojiPalette,
} as Meta;

const options: EmojiOption[] = [
    {icon: '☺️', value: 'emoji-1', title: 'smiling-face'},
    {icon: '❤️', value: 'emoji-2', title: 'heart'},
    {icon: '👍', value: 'emoji-3', title: 'thumbs-up'},
    {icon: '😂', value: 'emoji-4', title: 'laughing'},
    {icon: '😍', value: 'emoji-5', title: 'hearts-eyes'},
    {icon: '😎', value: 'emoji-6', title: 'cool'},
    {icon: '😛', value: 'emoji-7', title: 'tongue'},
    {icon: '😡', value: 'emoji-8', title: 'angry'},
    {icon: '😢', value: 'emoji-9', title: 'sad'},
    {icon: '😯', value: 'emoji-10', title: 'surprised'},
    {icon: '😱', value: 'emoji-11', title: 'face-screaming'},
    {icon: '🤗', value: 'emoji-12', title: 'smiling-face-with-open-hands'},
    {icon: '🤢', value: 'emoji-13', title: 'nauseated'},
    {icon: '🤥', value: 'emoji-14', title: 'lying-face'},
    {icon: '🤩', value: 'emoji-15', title: 'star-struck'},
    {icon: '🤭', value: 'emoji-16', title: 'face-with-hand-over-mouth'},
    {icon: '🤮', value: 'emoji-17', title: 'vomiting'},
    {icon: '🥳', value: 'emoji-18', title: 'partying'},
    {icon: '🥴', value: 'emoji-19', title: 'woozy'},
    {icon: '🥶', value: 'emoji-20', title: 'cold-face'},
];

export const Default = () => {
    return <PaletteBase />;
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
            <ShowcaseItem title="Size s">
                <PaletteBase size={'s'} />
            </ShowcaseItem>
            <ShowcaseItem title="Size m">
                <PaletteBase size={'m'} />
            </ShowcaseItem>
            <ShowcaseItem title="Size l">
                <PaletteBase size={'l'} />
            </ShowcaseItem>
            <ShowcaseItem title="Size xl">
                <PaletteBase size={'xl'} />
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

const customOptions: EmojiOption[] = Object.entries(icons).map(([key, icon]) => ({
    icon: <Icon data={icon} />,
    value: key,
    title: key,
}));

export const Custom = () => {
    return <PaletteBase options={customOptions} columns={24} />;
};

function PaletteBase(props: EmojiPaletteProps) {
    const [value, setValue] = React.useState<EmojiValue[]>([]);

    return <EmojiPalette value={value} options={options} onUpdate={setValue} {...props} />;
}
