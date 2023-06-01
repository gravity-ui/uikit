import React from 'react';

import type {Meta, Story} from '@storybook/react';

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

export const Texts: Story = () => <RenderTexts />;
export const Backgrounds: Story = () => <RenderBackgrounds />;
export const Lines: Story = () => <RenderLines />;
export const Effects: Story = () => <RenderEffects />;
export const Infographic: Story = () => <RenderInfographic />;
export const Promo: Story = () => <RenderPromo />;
export const Private: Story = (_, context) => <RenderPrivate theme={context.globals.theme} />;
