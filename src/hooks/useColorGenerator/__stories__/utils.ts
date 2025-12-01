import {faker} from '@faker-js/faker/locale/en';
import chroma from 'chroma-js';

import {textColorVarName} from '../constants';
import type {ColorDetails} from '../types';

export type TokenSource = 'uids' | 'strings' | 'numbers' | 'usernames' | 'custom';

const resolveCSSVariable = (
    varName: string,
    fallbackColor: string,
    property: 'color' | 'backgroundColor' = 'color',
): string => {
    // Resolve CSS variable by creating a temporary element
    const tempEl = document.createElement('div');
    tempEl.classList.add('xxx');
    if (property === 'color') {
        tempEl.style.color = `var(${varName})`;
    } else {
        tempEl.style.backgroundColor = `var(${varName})`;
    }
    tempEl.style.position = 'absolute';
    tempEl.style.visibility = 'hidden';
    tempEl.style.pointerEvents = 'none';
    document.body.appendChild(tempEl);

    const computedColor = getComputedStyle(tempEl)[property];
    // document.body.removeChild(tempEl);

    // Check if we got a valid color (not transparent or invalid)
    if (
        computedColor &&
        computedColor !== 'rgba(0, 0, 0, 0)' &&
        computedColor !== 'transparent' &&
        computedColor !== ''
    ) {
        return computedColor;
    }

    return fallbackColor;
};

export const getPageTextColor = () => {
    const fallbackColor = '#000000';
    return resolveCSSVariable(textColorVarName, fallbackColor, 'color');
};

export const getBackgroundColor = () => {
    const fallbackColor = '#ffffff';
    return resolveCSSVariable('--g-color-base-background', fallbackColor, 'backgroundColor');
};

export const mixColors = (color1: string, color2: string, percent: number) => {
    return chroma.mix(color1, color2, percent, 'rgb').hex();
};

/**
 * Convert color from hex, rgb, or rgba to luminance value
 * @param color Color in hex (#RRGGBB), rgb(r, g, b), or rgba(r, g, b, a) format
 * @returns Relative luminance value (0-1)
 */
export const getRelativeLuminance = (color: string): number => {
    let r: number, g: number, b: number;

    // Parse hex color
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        if (hex.length !== 6 || !/^[0-9A-Fa-f]+$/.test(hex)) {
            throw new Error(
                'Color must be in hex (#RRGGBB), rgb(r, g, b), or rgba(r, g, b, a) format',
            );
        }
        r = parseInt(hex.slice(0, 2), 16) / 255;
        g = parseInt(hex.slice(2, 4), 16) / 255;
        b = parseInt(hex.slice(4, 6), 16) / 255;
    }
    // Parse rgb or rgba color
    else if (color.startsWith('rgb')) {
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        const match = rgbMatch || rgbaMatch;
        if (!match) {
            throw new Error(
                'Color must be in hex (#RRGGBB), rgb(r, g, b), or rgba(r, g, b, a) format',
            );
        }
        r = parseInt(match[1], 10) / 255;
        g = parseInt(match[2], 10) / 255;
        b = parseInt(match[3], 10) / 255;
    } else {
        throw new Error('Color must be in hex (#RRGGBB), rgb(r, g, b), or rgba(r, g, b, a) format');
    }

    // Apply gamma correction
    const toLinear = (channel: number): number => {
        return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    };

    const rLinear = toLinear(r);
    const gLinear = toLinear(g);
    const bLinear = toLinear(b);

    // Calculate relative luminance
    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Calculate WCAG contrast ratio between two colors
 * @param color1 First color in hex (#RRGGBB) or rgb(r, g, b) format
 * @param color2 Second color in hex (#RRGGBB) or rgb(r, g, b) format
 * @returns Contrast ratio (1-21)
 */
export const calculateWCAGContrast = (color1: string, color2: string): number => {
    const l1 = getRelativeLuminance(color1);
    const l2 = getRelativeLuminance(color2);

    // Ensure L1 is the lighter color
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    // Calculate contrast ratio
    const contrast = (lighter + 0.05) / (darker + 0.05);

    // Round to 2 decimal places
    return Math.round(contrast * 100) / 100;
};

export const generateUid = (): string => {
    return faker.string.uuid();
};

export const generateString = (): string => {
    return faker.lorem.word();
};

export const generateNumber = (): string => {
    return faker.number.int({min: 1, max: 999999999}).toString();
};

export const generateUsername = (): string => {
    return faker.internet.username();
};

export const generateTokens = (
    source: TokenSource,
    count: number,
    customTokens?: string,
): string[] => {
    if (source === 'custom' && customTokens) {
        return customTokens
            .split('\n')
            .map((token) => token.trim())
            .filter((token) => token.length > 0);
    }

    const tokens: string[] = [];

    for (let i = 0; i < count; i++) {
        switch (source) {
            case 'uids':
                tokens.push(generateUid());
                break;
            case 'strings':
                tokens.push(generateString());
                break;
            case 'numbers':
                tokens.push(generateNumber());
                break;
            case 'usernames':
                tokens.push(generateUsername());
                break;
            default:
                tokens.push(generateString());
                break;
        }
    }

    return tokens;
};

export const getHexColor = ({rgb: {r, g, b}}: ColorDetails): string => {
    const rClamped = Math.max(0, Math.min(255, Math.round(r)));
    const rHex = rClamped.toString(16).padStart(2, '0');

    const gClamped = Math.max(0, Math.min(255, Math.round(g)));
    const gHex = gClamped.toString(16).padStart(2, '0');

    const bClamped = Math.max(0, Math.min(255, Math.round(b)));
    const bHex = bClamped.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
};

export const formatOklchColor = (colorDetails: ColorDetails) => {
    return `oklch(${colorDetails.oklch.l.toFixed(1)}% ${colorDetails.oklch.c.toFixed(1)}% ${colorDetails.oklch.h.toFixed(1)}°)`;
};

export type ContrastCalculationResult = {
    contrast: number;
    foreground: string;
    background: string;
};

/**
 * Blend a color with alpha channel over a background color
 * @param foregroundColor Color with possible alpha channel (rgba)
 * @param backgroundColor Background color to blend with
 * @returns Absolute color value as hex string
 */
const blendColorWithBackground = (foregroundColor: string, backgroundColor: string): string => {
    try {
        const foreground = chroma(foregroundColor);
        const background = chroma(backgroundColor);

        // Get alpha channel from foreground color
        const alpha = foreground.alpha();

        // If alpha is 1 (fully opaque), no blending needed
        if (alpha === 1) {
            return foreground.hex();
        }

        // Blend colors using alpha compositing: result = foreground * alpha + background * (1 - alpha)
        // chroma.mix(color1, color2, ratio, mode) where ratio is the amount of color2
        // So for foreground * alpha + background * (1 - alpha), we need ratio = 1 - alpha
        // But we need to ensure foreground alpha is ignored, so we create a new color without alpha
        const foregroundRgb = foreground.rgb();
        const foregroundWithoutAlpha = chroma.rgb(
            foregroundRgb[0],
            foregroundRgb[1],
            foregroundRgb[2],
        );
        const blended = chroma.mix(foregroundWithoutAlpha, background, 1 - alpha, 'rgb');

        return blended.hex();
    } catch {
        // Fallback: try to convert directly to hex
        try {
            return chroma(foregroundColor).hex();
        } catch {
            return foregroundColor;
        }
    }
};

/**
 * Calculate contrast for avatar based on style
 * @param colorDetails Color details from generateColor
 * @param storyAvatarStyle Avatar style ('filled' | 'outline' | 'transparent')
 * @param pageBackgroundColor Background color of the page
 * @returns Object with contrast ratio, foreground and background colors
 */
export const calculateAvatarContrast = (
    colorDetails: ColorDetails,
    storyAvatarStyle: 'filled' | 'outline' | 'transparent',
    pageBackgroundColor: string,
): ContrastCalculationResult => {
    const generatedColor = colorDetails.rgbString;

    // default for storyAvatarStyle = 'filled'
    let foreground = getPageTextColor();
    let background = generatedColor;

    if (storyAvatarStyle === 'transparent') {
        foreground = generatedColor;
        background = mixColors(colorDetails.rgbString, pageBackgroundColor, 0.9);
    }

    if (storyAvatarStyle === 'outline') {
        foreground = generatedColor;
        background = pageBackgroundColor;
    }

    // For 'filled' style, blend foreground color with background if foreground has transparency
    let foregroundHex: string;
    if (storyAvatarStyle === 'filled') {
        foregroundHex = blendColorWithBackground(foreground, background);
    } else {
        foregroundHex = chroma(foreground).hex();
    }

    const backgroundHex = chroma(background).hex();

    const contrast = calculateWCAGContrast(foregroundHex, backgroundHex);

    return {
        contrast,
        foreground: foregroundHex,
        background: backgroundHex,
    };
};
