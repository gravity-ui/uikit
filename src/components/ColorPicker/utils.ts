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
            // If alpha is disabled, strip alpha channel from hex value
            if (!alpha && value.length === 9) {
                value = value.substring(0, 7); // Keep only #RRGGBB
            }

            const hsva = hexToHsva(value);

            // If alpha is disabled, ensure alpha is set to 1
            if (!alpha) {
                hsva.a = 1;
            }

            return hsva;
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
            const hexValue = alpha ? hsvaToHexa(hsva) : hsvaToHex(hsva);

            return hexValue;
        }
    }
};
