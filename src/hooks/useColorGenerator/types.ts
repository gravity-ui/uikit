export type ColorOptions = {
    lightness: [number, number];
    situration: [number, number];
};

export type ThemeColorSettings = {
    light: ColorOptions;
    medium: ColorOptions;
    heavy: ColorOptions;
};

export type INTENSITY = 'light' | 'medium' | 'heavy';

export type ColorProps = {
    intensity?: INTENSITY;
    seed: string;
    theme: string;
};

export type UseColorGeneratorProps = {
    intensity?: INTENSITY;
    seed: string;
};

export type HslColorProps = {
    hash: number;
    intensity: INTENSITY;
    theme: string;
};
