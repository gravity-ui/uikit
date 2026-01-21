import {colorOptions, textColorVarName} from './constants';
import {extractHashPart, getHash, getHue, normalizeHash} from './hash-utils';
import type {ColorDetails, GenerateColorProps} from './types';

export const linearToSrgb = (channel: number): number => {
    if (channel <= 0.0031308) {
        return 12.92 * channel;
    } else {
        return 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    }
};

export const oklchToRgb = (l: number, c: number, h: number): [number, number, number] => {
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
    const red = Math.max(0, Math.min(255, Math.round(255 * linearToSrgb(linearR))));
    const green = Math.max(0, Math.min(255, Math.round(255 * linearToSrgb(linearG))));
    const blue = Math.max(0, Math.min(255, Math.round(255 * linearToSrgb(linearB))));

    // Return clamped values in valid RGB range [0, 255]
    return [red, green, blue];
};

const generateColorFromRanges = (
    seed: string,
    lightnessRange: [number, number],
    chromaRange: [number, number],
): ColorDetails => {
    const hash = getHash(seed);
    const hue = getHue(hash);

    const saturationHash = extractHashPart(hash, 0);
    const lightnessHash = extractHashPart(hash, 1);

    const chroma = normalizeHash(saturationHash, chromaRange[0], chromaRange[1]);
    const lightness = normalizeHash(lightnessHash, lightnessRange[0], lightnessRange[1]);

    const [red, green, blue] = oklchToRgb(lightness / 100, chroma / 100, hue);

    return {
        hash,
        oklch: {
            l: lightness,
            c: chroma,
            h: hue,
        },
        rgb: {
            r: red,
            g: green,
            b: blue,
        },
        textColor: `var(${textColorVarName})`,
    };
};

export const generateColor = ({seed, theme}: GenerateColorProps): ColorDetails => {
    const {lightness: lightnessRange, chroma: chromaRange} = colorOptions[theme];
    return generateColorFromRanges(seed, lightnessRange, chromaRange);
};

export const generateCustomColor = ({
    seed,
    lightnessRange,
    chromaRange,
}: {
    seed: string;
    lightnessRange: [number, number];
    chromaRange: [number, number];
}): ColorDetails => {
    return generateColorFromRanges(seed, lightnessRange, chromaRange);
};
