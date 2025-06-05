import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {PaletteGenerator} from './PaletteGenerator/PaletteGenerator';

export default {
    title: 'Branding/Palette Generator',
} as Meta;

export const Default: StoryFn = (_, ctx) => {
    return <PaletteGenerator theme={ctx.globals.theme} />;
};

Default.storyName = 'Palette Generator';
