import type {ThemeType} from 'src/components';

export type ColorOptions = {
    lightness: [number, number];
    chroma: [number, number];
};

export type GenerateColorProps = {
    seed: string;
    theme: ThemeType;
};

export interface ColorDetails {
    hash: number;
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
    textColor: string;
}
