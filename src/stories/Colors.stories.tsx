import React from 'react';

import type {Meta, StoryFn} from '@storybook/react';

import {RenderBackgrounds} from '../demo/colors/Base';
import {RenderEffects} from '../demo/colors/Effects';
import {RenderInfographic} from '../demo/colors/Infographic';
import {RenderLines} from '../demo/colors/Lines';
import {RenderPrivate} from '../demo/colors/Private';
import {RenderPromo} from '../demo/colors/Promo';
import {RenderTexts} from '../demo/colors/Texts';

export default {
    title: 'Colors',
} as Meta;

export const Texts: StoryFn = () => <RenderTexts />;
export const Backgrounds: StoryFn = () => <RenderBackgrounds />;
export const Lines: StoryFn = () => <RenderLines />;
export const Effects: StoryFn = () => <RenderEffects />;
export const Infographic: StoryFn = () => <RenderInfographic />;
export const Promo: StoryFn = () => <RenderPromo />;
export const Private: StoryFn = (_, context) => <RenderPrivate theme={context.globals.theme} />;
