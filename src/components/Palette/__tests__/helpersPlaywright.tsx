import type {PaletteOption, PaletteProps} from '../Palette';
import {Palette} from '../Palette';

export const TestPalette = (props: Partial<PaletteProps>) => {
    const options: PaletteOption[] = [
        {content: '😊', value: 'value-1', title: 'smiling-face'},
        {content: '❤️', value: 'value-2', title: 'heart'},
        {content: '👍', value: 'value-3', title: 'thumbs-up'},
        {content: '😂', value: 'value-4', title: 'laughing'},
        {content: '😍', value: 'value-5', title: 'hearts-eyes'},
        {content: '😎', value: 'value-6', title: 'cool', disabled: true},
        {content: '😛', value: 'value-7', title: 'tongue'},
        {content: '😡', value: 'value-8', title: 'angry'},
        {content: '😢', value: 'value-9', title: 'sad', disabled: true},
    ];
    return <Palette {...props} options={options} />;
};
