export type ColorOptions = {
    lightness: [number, number];
    chroma: [number, number];
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

export type ColorDetailsProps = {
    hash: number;
    theme: string;
};
