/* eslint-disable no-bitwise */
import type {ColorProps, ThemeColorSettings} from '../types';

import {BLACK_COLOR, WHITE_COLOR, colorOptions} from './constants';
import {getHue} from './getHue';
import {hashFnv32a} from './hashFnv32a';
import {normalizeHash} from './normalizeHash';
import {randomIndex} from './randomIndex';

class Color {
    private _colorKeys?: string[];
    private _saturation?: number;
    private _lightness?: number;
    private _token: string;
    private _hash: number;
    private _mode: ColorProps['mode'];
    private _hue: number | null;
    private _saturationRange: [number, number];
    private _lightnessRange: [number, number];
    private _themeOptions: ThemeColorSettings;

    constructor({token, colorKeys, theme, mode}: ColorProps) {
        this._token = token;
        this._mode = mode ?? 'unsaturated';
        this._hash = this.getHash(token);
        this._colorKeys = colorKeys;
        this._themeOptions = colorOptions[theme];
        this._lightnessRange = this._themeOptions[this._mode].lightness;
        this._saturationRange = this._themeOptions[this._mode].situration;
        this._hue = null;
    }

    get color() {
        if (this._colorKeys && this._colorKeys.length > 0) {
            const index = this.getColorKeysIndex();

            return this._colorKeys[index];
        }

        return this.hslColor();
    }

    get oppositeColor() {
        if (!this._hue || !this._saturation || !this._lightness) {
            return WHITE_COLOR;
        }

        const luminance = this.getLuminance(this._hue, this._saturation, this._lightness);

        return luminance > 0.7 ? BLACK_COLOR : WHITE_COLOR;
    }

    private getColorKeysIndex() {
        if (!this._colorKeys || this._colorKeys.length === 0) {
            return -1;
        }

        return randomIndex(this._token, this._colorKeys.length);
    }

    private hslToRgb = (h: number, s: number, l: number) => {
        s /= 100;
        l /= 100;

        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);

        const f = (n: number) => {
            return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        };

        const r = ~~(255 * f(0));
        const g = ~~(255 * f(8));
        const b = ~~(255 * f(4));

        return [r, g, b] as [number, number, number];
    };

    private rgbToLuminance(r: number, g: number, b: number) {
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    }

    private getLuminance(h: number, s: number, l: number) {
        const rgb = this.hslToRgb(h, s, l);
        const luminance = this.rgbToLuminance(...rgb);

        return luminance;
    }

    private hslColor() {
        this._hue = getHue(this._hash);

        this._saturation = normalizeHash(
            this._hash,
            this._saturationRange[0],
            this._saturationRange[1],
        );

        this._lightness = normalizeHash(
            this._hash,
            this._lightnessRange[0],
            this._lightnessRange[1],
        );

        const color = `hsl(${this._hue}deg ${this._saturation}% ${this._lightness}%)`;

        return color;
    }

    private getHash(token: string) {
        const hash = hashFnv32a(token, 0x73_6f_6d_65) ^ hashFnv32a(token, 0x64_6f_72_61);

        return hash;
    }
}

export const colorGenerator = (args: ColorProps) => {
    return new Color(args);
};
