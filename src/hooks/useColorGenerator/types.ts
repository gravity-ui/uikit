export type ColorOptions = {
    lightness: [number, number];
    saturation: [number, number];
};

export type ThemeColorSettings = {
    light: ColorOptions;
    medium: ColorOptions;
    heavy: ColorOptions;
};

export type Intensity = 'light' | 'medium' | 'heavy';

export type ColorProps = {
    intensity?: Intensity;
    seed: string;
    theme: string;
};

export type UseColorGeneratorProps = {
    intensity?: Intensity;
    seed: string;
};

export type UseColorGeneratorResult = {
    color: string;
    textColor: string;
};

export type HslColorProps = {
    hash: number;
    intensity: Intensity;
    theme: string;
};
