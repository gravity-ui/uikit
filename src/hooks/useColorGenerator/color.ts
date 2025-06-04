/* eslint-disable no-bitwise */

import {colorOptions} from './constants';
import type {ColorProps, HslColorProps, Intensity} from './types';
import {getHue, hashFnv32a, normalizeHash} from './utils';

const linearToSrgb = (channel: number): number => {
    if (channel <= 0.0031308) {
        return 12.92 * channel;
    } else {
        return 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    }
};

const oklchToRgb = (l: number, c: number, h: number) => {
    // 1. Convert OKLCH to OKLab
    // Convert hue to radians
    const hRadians = (h * Math.PI) / 180;

    // Calculate a and b components
    const a = c * Math.cos(hRadians);
    const b = c * Math.sin(hRadians);

    // 2. Convert OKLab to linear RGB
    // OKLab to LMS
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.291485548 * b;

    // LMS to linear RGB
    const lCubed = l_ * l_ * l_;
    const mCubed = m_ * m_ * m_;
    const sCubed = s_ * s_ * s_;

    const linearR = +4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed;
    const linearG = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed;
    const linearB = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.707614701 * sCubed;

    // 3. Convert linear RGB to sRGB (with gamma correction)
    const red = Math.round(255 * linearToSrgb(linearR));
    const green = Math.round(255 * linearToSrgb(linearG));
    const blue = Math.round(255 * linearToSrgb(linearB));

    // Return clamped values directly
    return [red, green, blue];
};

const getHash = (seed: string) => {
    return hashFnv32a(seed, 0x73_6f_6d_65) ^ hashFnv32a(seed, 0x64_6f_72_61);
};

const generateColor = ({hash, intensity, theme}: HslColorProps) => {
    const hue = getHue(hash);
    const themeOptions = colorOptions[theme];
    const lightnessRange = themeOptions[intensity].lightness;
    const saturationRange = themeOptions[intensity].saturation;

    const saturation = normalizeHash(hash, saturationRange[0], saturationRange[1]);
    const lightness = normalizeHash(hash, lightnessRange[0], lightnessRange[1]);

    const [red, green, blue] = oklchToRgb(lightness / 100, saturation / 100, hue);

    return `rgb(${red}, ${green}, ${blue})`;
};

export const getTextColor = (intensity: Intensity = 'light') => {
    if (intensity === 'heavy') {
        return 'var(--g-color-text-inverted-primary)';
    }

    return 'var(--g-color-text-primary)';
};

export const getPersistentColor = ({seed, intensity = 'light', theme}: ColorProps) => {
    const hash = getHash(seed);
    return generateColor({hash, intensity, theme});
};
