import type {Meta, StoryFn} from '@storybook/react-webpack5';

import {RenderBackgrounds} from '../demo/colors/Base';
import {RenderEffects} from '../demo/colors/Effects';
import {RenderLines} from '../demo/colors/Lines';
import {RenderMisc} from '../demo/colors/Misc';
import {RenderPrivate} from '../demo/colors/Private';
import {RenderTexts} from '../demo/colors/Texts';

export default {
    title: 'Colors',
    parameters: {
        a11y: {
            context: '#storybook-root',
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: false,
                    },
                    {
                        id: 'button-name',
                        enabled: false,
                        selector: '[aria-labelledby]',
                    },
                ],
            },
        },
    },
} as Meta;

export const Texts: StoryFn = () => <RenderTexts />;
export const Backgrounds: StoryFn = () => <RenderBackgrounds />;
export const Lines: StoryFn = () => <RenderLines />;
export const Effects: StoryFn = () => <RenderEffects />;
export const Misc: StoryFn = () => <RenderMisc />;
export const Private: StoryFn = (_, context) => <RenderPrivate theme={context.globals.theme} />;
