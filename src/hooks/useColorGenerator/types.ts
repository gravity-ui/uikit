export type ColorOptions = {
    lightness: [number, number];
    situration: [number, number];
};

export type ThemeColorSettings = {
    saturated: ColorOptions;
    unsaturated: ColorOptions;
    bright: ColorOptions;
};

export type ColorProps = {
    colorKeys?: string[];
    mode?: 'saturated' | 'unsaturated' | 'bright';
    token: string;
    theme: string;
};

export type UseColorGeneratorProps = {
    colorKeys?: string[];
    mode?: 'saturated' | 'unsaturated' | 'bright';
    token: string;
};
