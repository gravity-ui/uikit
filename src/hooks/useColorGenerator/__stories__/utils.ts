import chroma from 'chroma-js';

import {randomString} from '../../../components/utils/common';

import {USERNAME_PREFIXES, USERNAME_SUFFIXES} from './constants';

export type StringType = 'random' | 'username' | 'id';
export type TokenSource = 'random' | 'usernames' | 'ids' | 'mixed' | 'custom';

export const getBackgroundColor = () => {
    const fallbackColor = '#ffffff';

    return (
        getComputedStyle(document.body).getPropertyValue('--g-color-base-background') ||
        fallbackColor
    );
};

export const mixColors = (color1: string, color2: string) => {
    console.log('color1', color1);
    console.log('color2', color2);
    return chroma(color1).mix(color2).hex();
};

/**
 * Convert color from hex or rgb to luminance value
 * @param color Color in hex (#RRGGBB) or rgb(r, g, b) format
 * @returns Relative luminance value (0-1)
 */
export const getRelativeLuminance = (color: string): number => {
    let r: number, g: number, b: number;

    // Parse hex color
    if (color.startsWith('#')) {
        const hex = color.slice(1);
        if (hex.length !== 6 || !/^[0-9A-Fa-f]+$/.test(hex)) {
            throw new Error('Color must be in hex (#RRGGBB) or rgb(r, g, b) format');
        }
        r = parseInt(hex.slice(0, 2), 16) / 255;
        g = parseInt(hex.slice(2, 4), 16) / 255;
        b = parseInt(hex.slice(4, 6), 16) / 255;
    }
    // Parse rgb color
    else if (color.startsWith('rgb')) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!match) {
            throw new Error('Color must be in hex (#RRGGBB) or rgb(r, g, b) format');
        }
        r = parseInt(match[1], 10) / 255;
        g = parseInt(match[2], 10) / 255;
        b = parseInt(match[3], 10) / 255;
    } else {
        throw new Error('Color must be in hex (#RRGGBB) or rgb(r, g, b) format');
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

export const generateUsername = (): string => {
    const prefix = USERNAME_PREFIXES[Math.floor(Math.random() * USERNAME_PREFIXES.length)];
    const suffix = USERNAME_SUFFIXES[Math.floor(Math.random() * USERNAME_SUFFIXES.length)];
    const separator = Math.random() > 0.5 ? '_' : '';
    return `${prefix}${separator}${suffix}`;
};

export const generateId = (): string => {
    const timestamp = Date.now().toString(36);
    const randomPart = randomString(6).toLowerCase();
    return `${timestamp}_${randomPart}`;
};

export const generateByType = (type: StringType, length = 16): string => {
    switch (type) {
        case 'username':
            return generateUsername();
        case 'id':
            return generateId();
        case 'random':
            return randomString(length);
        default:
            return randomString(16);
    }
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
            .filter((token) => token.length > 0)
            .slice(0, count);
    }

    const tokens: string[] = [];

    for (let i = 0; i < count; i++) {
        switch (source) {
            case 'usernames':
                tokens.push(generateUsername());
                break;
            case 'ids':
                tokens.push(generateId());
                break;
            case 'mixed': {
                const types: StringType[] = ['random', 'username', 'id'];
                const randomType = types[Math.floor(Math.random() * types.length)];
                tokens.push(generateByType(randomType));
                break;
            }
            case 'random':
            default:
                tokens.push(randomString(32));
                break;
        }
    }

    return tokens;
};
