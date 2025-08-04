// import {randomString} from '../../components/utils/common';

import {colorOptions} from './constants';
import type {ColorProps, HslColorProps, Intensity} from './types';
import {extractHashPart, getHash, getHue, normalizeHash} from './utils';

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

export interface ColorDetails {
    hash: number;
    hue: number;
    lightness: number;
    saturation: number;
    oklch: {
        l: number;
        c: number;
        h: number;
    };
    rgb: {
        r: number;
        g: number;
        b: number;
    };
    rgbString: string;
}

const generateColorDetails = ({hash, intensity, theme}: HslColorProps): ColorDetails => {
    const hue = getHue(hash);
    const themeOptions = colorOptions[theme];
    const lightnessRange = themeOptions[intensity].lightness;
    const saturationRange = themeOptions[intensity].saturation;

    const saturationHash = extractHashPart(hash, 0); // младшие биты
    const lightnessHash = extractHashPart(hash, 1); // средние биты

    const saturation = normalizeHash(saturationHash, saturationRange[0], saturationRange[1]);
    const lightness = normalizeHash(lightnessHash, lightnessRange[0], lightnessRange[1]);

    const [red, green, blue] = oklchToRgb(lightness / 100, saturation / 100, hue);

    return {
        hash,
        hue,
        lightness,
        saturation,
        oklch: {
            l: lightness,
            c: saturation,
            h: hue,
        },
        rgb: {
            r: red,
            g: green,
            b: blue,
        },
        rgbString: `rgb(${red}, ${green}, ${blue})`,
    };
};

const generateColor = ({hash, intensity, theme}: HslColorProps) => {
    const details = generateColorDetails({hash, intensity, theme});
    return details.rgbString;
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

export const getPersistentColorDetails = ({
    seed,
    intensity = 'light',
    theme,
}: ColorProps): ColorDetails => {
    const hash = getHash(seed);
    return generateColorDetails({hash, intensity, theme});
};

/**
 * Calculates relative luminance of a color according to WCAG 2.1
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @returns Relative luminance value
 */
const calculateRelativeLuminance = (r: number, g: number, b: number): number => {
    // Convert sRGB to linear RGB
    const linearR = r / 255 <= 0.03928 ? r / 255 / 12.92 : Math.pow((r / 255 + 0.055) / 1.055, 2.4);
    const linearG = g / 255 <= 0.03928 ? g / 255 / 12.92 : Math.pow((g / 255 + 0.055) / 1.055, 2.4);
    const linearB = b / 255 <= 0.03928 ? b / 255 / 12.92 : Math.pow((b / 255 + 0.055) / 1.055, 2.4);

    // Calculate relative luminance
    return 0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB;
};

/**
 * Calculates WCAG contrast ratio between two colors
 * @param luminance1 Luminance of first color
 * @param luminance2 Luminance of second color
 * @returns Contrast ratio
 */
const calculateContrastRatio = (luminance1: number, luminance2: number): number => {
    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);
    return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Overlays a color with 90% transparency on a background and calculates WCAG contrast between original and overlaid colors
 * @param r Red component (0-255)
 * @param g Green component (0-255)
 * @param b Blue component (0-255)
 * @param backgroundR Background red component (0-255), defaults to white
 * @param backgroundG Background green component (0-255), defaults to white
 * @param backgroundB Background blue component (0-255), defaults to white
 * @returns Object with overlaid color and contrast ratio
 */
export const overlayColorAndCalculateContrast = (
    r: number,
    g: number,
    b: number,
    backgroundR = 255,
    backgroundG = 255,
    backgroundB = 255,
): {overlaidColor: {r: number; g: number; b: number}; contrastRatio: number} => {
    // Overlay color with 90% transparency (10% opacity of overlay) on background
    // Formula: result = background * (1 - alpha) + overlay * alpha
    const alpha = 0.15; // 10% opacity of overlay (90% transparency)
    const overlaidR = Math.round(backgroundR * (1 - alpha) + r * alpha);
    const overlaidG = Math.round(backgroundG * (1 - alpha) + g * alpha);
    const overlaidB = Math.round(backgroundB * (1 - alpha) + b * alpha);

    // Calculate relative luminances
    const originalLuminance = calculateRelativeLuminance(r, g, b);
    const overlaidLuminance = calculateRelativeLuminance(overlaidR, overlaidG, overlaidB);

    // Calculate contrast ratio between original color and overlaid color
    const contrastRatio = calculateContrastRatio(originalLuminance, overlaidLuminance);

    return {
        overlaidColor: {
            r: overlaidR,
            g: overlaidG,
            b: overlaidB,
        },
        contrastRatio,
    };
};
