import type {ThemeType} from '../../components';

export type ColorOptions = {
    lightness: [number, number];
    chroma: [number, number];
};

export type GenerateColorProps = {
    seed: string;
    theme: ThemeType;
};

export type UseColorGeneratorProps = {
    seed: string;
    /** @deprecated Theme is resolved automatically from context. This field has no effect. */
    theme?: ThemeType;
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
    textColor: string;
}
