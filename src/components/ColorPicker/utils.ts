import {
    hexToHsva,
    hsvaToHex,
    hsvaToHexa,
    hsvaToRgbString,
    hsvaToRgba,
    rgbStringToHsva,
    rgbaStringToHsva,
} from '@uiw/react-color';
import type {HsvaColor, RgbaColor} from '@uiw/react-color';

import {Modes} from './types';

export const convertSelectedModeColorToHsva = (value: string, mode: Modes, alpha: boolean) => {
    switch (mode) {
        case Modes.Hex: {
            return hexToHsva(value);
        }
        case Modes.Rgb: {
            return alpha ? rgbaStringToHsva(value) : rgbStringToHsva(value);
        }
    }
};

export function formatRgbaString(hsvaResult: RgbaColor) {
    const {r, g, b, a} = hsvaResult;

    const roundedA = Math.round(a * 100) / 100;

    return `rgba(${r},${g},${b},${roundedA})`;
}

export const getTextValueByMode = (hsva: HsvaColor, mode: Modes, alpha: boolean) => {
    switch (mode) {
        case Modes.Rgb: {
            return alpha ? formatRgbaString(hsvaToRgba(hsva)) : hsvaToRgbString(hsva);
        }
        case Modes.Hex: {
            return alpha ? hsvaToHexa(hsva) : hsvaToHex(hsva);
        }
    }
};
