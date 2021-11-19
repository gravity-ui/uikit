import React from 'react';
import {Meta, Story} from '@storybook/react';
import {RenderTexts} from '../demo/colors/Texts';
import {RenderBackgrounds} from '../demo/colors/Base';
import {RenderLines} from '../demo/colors/Lines';
import {RenderInfographic} from '../demo/colors/Infographic';
import {RenderEffects} from '../demo/colors/Effects';
import {RenderPrivate} from '../demo/colors/Private';
import {RenderPromo} from '../demo/colors/Promo';

export default {
    title: 'Colors',
} as Meta;

export const Texts: Story = () => <RenderTexts />;
export const Backgrounds: Story = () => <RenderBackgrounds />;
export const Lines: Story = () => <RenderLines />;
export const Infographic: Story = () => <RenderInfographic />;
export const Effects: Story = () => <RenderEffects />;
export const Private: Story = () => <RenderPrivate />;
export const Promo: Story = () => <RenderPromo />;
