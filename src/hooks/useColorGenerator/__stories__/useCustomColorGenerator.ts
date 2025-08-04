import * as React from 'react';

import {getTextColor} from '../color';
import type {ThemeColorSettings, UseColorGeneratorProps, UseColorGeneratorResult} from '../types';
import {extractHashPart, getHash, getHue, normalizeHash} from '../utils';

// Кастомная функция для генерации цвета с переданными настройками
const generateCustomColor = (
    seed: string,
    intensity: UseColorGeneratorProps['intensity'] = 'light',
    customColorOptions: ThemeColorSettings,
) => {
    const hash = getHash(seed);
    const hue = getHue(hash);
    const themeOptions = customColorOptions;
    const lightnessRange = themeOptions[intensity].lightness;
    const saturationRange = themeOptions[intensity].saturation;

    const saturationHash = extractHashPart(hash, 0);
    const lightnessHash = extractHashPart(hash, 1);

    const saturation = normalizeHash(saturationHash, saturationRange[0], saturationRange[1]);
    const lightness = normalizeHash(lightnessHash, lightnessRange[0], lightnessRange[1]);

    // Конвертируем OKLCH в RGB
    const hRadians = (hue * Math.PI) / 180;
    const a = (saturation / 100) * Math.cos(hRadians);
    const b = (saturation / 100) * Math.sin(hRadians);

    const l_ = lightness / 100 + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = lightness / 100 - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = lightness / 100 - 0.0894841775 * a - 1.291485548 * b;

    const lCubed = l_ * l_ * l_;
    const mCubed = m_ * m_ * m_;
    const sCubed = s_ * s_ * s_;

    const linearR = +4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed;
    const linearG = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed;
    const linearB = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed;

    const linearToSrgb = (channel: number): number => {
        if (channel <= 0.0031308) {
            return 12.92 * channel;
        } else {
            return 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
        }
    };

    const red = Math.max(0, Math.min(255, Math.round(255 * linearToSrgb(linearR))));
    const green = Math.max(0, Math.min(255, Math.round(255 * linearToSrgb(linearG))));
    const blue = Math.max(0, Math.min(255, Math.round(255 * linearToSrgb(linearB))));

    return `rgb(${red}, ${green}, ${blue})`;
};

export function useCustomColorGenerator({
    intensity,
    seed,
    colorOptions,
}: UseColorGeneratorProps & {colorOptions: ThemeColorSettings}): UseColorGeneratorResult {
    const color = React.useMemo(
        () => generateCustomColor(seed, intensity, colorOptions),
        [intensity, seed, colorOptions],
    );

    const textColor = React.useMemo(() => getTextColor(intensity), [intensity]);

    return {color, textColor};
}
