/* eslint-disable no-bitwise */
import {BLACK_COLOR, WHITE_COLOR, colorOptions} from './constants';
import type {ColorProps, ThemeColorSettings} from './types';
import {getHue, hashFnv32a, normalizeHash, randomIndex} from './utils';

export class ColorGenerator {
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

    get textColor() {
        if (!this._hue || !this._saturation || !this._lightness) {
            return WHITE_COLOR;
        }

        return this.getTextColor(this._hue, this._saturation, this._lightness);
    }

    private getColorKeysIndex() {
        if (!this._colorKeys || this._colorKeys.length === 0) {
            return -1;
        }

        return randomIndex(this._token, this._colorKeys.length);
    }

    // https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
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

    // https://www.w3.org/TR/WCAG20/#relativeluminancedef
    private getTextColor(
        h: number,
        s: number,
        l: number,
        lightColor = WHITE_COLOR,
        darkColor = BLACK_COLOR,
    ) {
        const rgb = this.hslToRgb(h, s, l);
        const N = rgb.length;
        const normalizedValues = Array(N);

        for (let i = 0; i < N; i++) {
            let c = rgb[i];
            c /= 255.0;

            if (c <= 0.04045) {
                c /= 12.92;
            } else {
                c = Math.pow((c + 0.055) / 1.055, 2.4);
            }

            normalizedValues[i] = c;
        }

        const [r, g, b] = normalizedValues;
        const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return L > 0.179 ? darkColor : lightColor;
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
