import * as React from 'react';

import type {RgbColor, RgbaColor} from 'colord';
import {HexAlphaColorPicker, HexColorPicker, RgbColorPicker, RgbaColorPicker} from 'react-colorful';

import {ColorPickerMode} from '../types';
import {hexToRgb, hexToRgba, rgbToHex, rgbaToHex} from '../utils';

interface PickerProps {
    color: string;
    onChange: (color: string) => void;
    mode: ColorPickerMode;
    withAlpha: boolean;
}

export const Picker = ({color, onChange, mode, withAlpha}: PickerProps) => {
    const handleColorChange = React.useCallback(
        (newColor: any) => {
            let newHex: string;

            switch (mode) {
                case ColorPickerMode.HEX:
                    newHex = newColor as string;
                    break;
                case ColorPickerMode.RGB:
                    if (withAlpha) {
                        newHex = rgbaToHex(newColor as RgbaColor);
                    } else {
                        newHex = rgbToHex(newColor as RgbColor);
                    }
                    break;
                default:
                    newHex = newColor as string;
            }

            if (newHex !== color) {
                onChange(newHex);
            }
        },
        [color, mode, onChange, withAlpha],
    );

    const getColorForPicker = React.useCallback(() => {
        switch (mode) {
            case ColorPickerMode.RGB:
                if (withAlpha) {
                    return hexToRgba(color) || {r: 0, g: 0, b: 0, a: 1};
                } else {
                    return hexToRgb(color) || {r: 0, g: 0, b: 0};
                }
            default:
                return color;
        }
    }, [color, mode, withAlpha]);

    switch (mode) {
        case ColorPickerMode.HEX:
            return withAlpha ? (
                <HexAlphaColorPicker color={color} onChange={handleColorChange} />
            ) : (
                <HexColorPicker color={color} onChange={handleColorChange} />
            );
        case ColorPickerMode.RGB:
            if (withAlpha) {
                const rgbaColor = getColorForPicker() as RgbaColor;
                return <RgbaColorPicker color={rgbaColor} onChange={handleColorChange} />;
            } else {
                const rgbColor = getColorForPicker() as RgbColor;
                return <RgbColorPicker color={rgbColor} onChange={handleColorChange} />;
            }

        default:
            return <HexColorPicker color={color} onChange={handleColorChange} />;
    }
};
