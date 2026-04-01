import {
    hexToHsva,
    hslaStringToHsva,
    hsvaStringToHsva,
    hsvaToHex,
    hsvaToHexa,
    hsvaToRgbString,
    hsvaToRgbaString,
    rgbaStringToHsva,
    validHex,
} from '@uiw/react-color';
import type {HsvaColor, RgbaColor} from '@uiw/react-color';

import {Modes} from './types';

const DEFAULT_HSVA: HsvaColor = {h: 0, s: 0, v: 0, a: 1};

const POSSIBLE_HEX_RE = /^(?:#)?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

const normalizePossibleHexInput = (value: string): string => {
    const trimmed = value.trim();

    if (!trimmed) {
        return trimmed;
    }

    if (POSSIBLE_HEX_RE.test(trimmed) && !trimmed.startsWith('#')) {
        return `#${trimmed}`;
    }

    return trimmed;
};

const normalizeAlpha = (hsva: HsvaColor, withAlpha: boolean): HsvaColor => {
    return withAlpha ? hsva : {...hsva, a: 1};
};

const getInvalidResult = () => ({
    hsva: {...DEFAULT_HSVA},
    formattedValue: '',
    isValid: false,
});

export const isValidHsva = (value: HsvaColor): boolean => {
    return (
        Number.isFinite(value.h) &&
        Number.isFinite(value.s) &&
        Number.isFinite(value.v) &&
        Number.isFinite(value.a) &&
        value.h >= 0 &&
        value.h <= 360 &&
        value.s >= 0 &&
        value.s <= 100 &&
        value.v >= 0 &&
        value.v <= 100 &&
        value.a >= 0 &&
        value.a <= 1
    );
};

const parseStringToHsva = (value: string): HsvaColor | null => {
    const trimmed = value.trim();

    if (!trimmed) {
        return null;
    }

    const normalizedHex = normalizePossibleHexInput(trimmed);

    if (validHex(normalizedHex)) {
        const hsva = hexToHsva(normalizedHex);
        return isValidHsva(hsva) ? hsva : null;
    }

    if (/^rgba?\(/i.test(trimmed)) {
        const hsva = rgbaStringToHsva(trimmed);
        return isValidHsva(hsva) ? hsva : null;
    }

    if (/^hsla?\(/i.test(trimmed)) {
        const hsva = hslaStringToHsva(trimmed);
        return isValidHsva(hsva) ? hsva : null;
    }

    if (/^hsva?\(/i.test(trimmed)) {
        const hsva = hsvaStringToHsva(trimmed);
        return isValidHsva(hsva) ? hsva : null;
    }

    return null;
};

export const getTextValueByMode = (hsva: HsvaColor, mode: Modes, withAlpha: boolean): string => {
    const normalizedHsva = normalizeAlpha(hsva, withAlpha);

    switch (mode) {
        case Modes.Hex:
            return withAlpha ? hsvaToHexa(normalizedHsva) : hsvaToHex(normalizedHsva);

        case Modes.Rgb:
            return withAlpha ? hsvaToRgbaString(normalizedHsva) : hsvaToRgbString(normalizedHsva);

        default:
            return withAlpha ? hsvaToHexa(normalizedHsva) : hsvaToHex(normalizedHsva);
    }
};

export const parseColorToHsva = (
    value: string,
    withAlpha: boolean,
): {
    hsva: HsvaColor;
    isValid: boolean;
} => {
    const parsed = parseStringToHsva(value);

    if (!parsed) {
        return {
            hsva: {...DEFAULT_HSVA},
            isValid: false,
        };
    }

    const hsva = normalizeAlpha(parsed, withAlpha);

    if (!isValidHsva(hsva)) {
        return {
            hsva: {...DEFAULT_HSVA},
            isValid: false,
        };
    }

    return {
        hsva,
        isValid: true,
    };
};

export const normalizeInputColorForMode = (
    value: string,
    selectedMode: Modes,
    withAlpha: boolean,
): {
    hsva: HsvaColor;
    formattedValue: string;
    isValid: boolean;
} => {
    const parsed = parseColorToHsva(value, withAlpha);

    if (!parsed.isValid) {
        return getInvalidResult();
    }

    return {
        hsva: parsed.hsva,
        formattedValue: getTextValueByMode(parsed.hsva, selectedMode, withAlpha),
        isValid: true,
    };
};

export function formatRgbaString(rgba: RgbaColor) {
    const {r, g, b, a} = rgba;
    const roundedA = Math.round(a * 100) / 100;

    return `rgba(${r},${g},${b},${roundedA})`;
}
