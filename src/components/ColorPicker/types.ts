export interface RGB {
    r: number | string;
    g: number | string;
    b: number | string;
}

export interface RGBA extends RGB {
    a: number;
}

// Color format types
export type HexColor = string;
export type RgbColor = {r: number; g: number; b: number};
export type RgbaColor = {r: number; g: number; b: number; a: number};
export type HSVColor = {h: number; s: number; v: number};
export type HSVAColor = {h: number; s: number; v: number; a: number};

// Color picker modes
export enum ColorPickerMode {
    HEX = 'HEX',
    RGB = 'RGB',
}

// Component props
export interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    className?: string;
    withAlpha?: boolean;
    mode?: ColorPickerMode;
}

// Picker component props
export interface PickerProps {
    color: string;
    onChange: (color: string) => void;
    mode: ColorPickerMode;
    withAlpha: boolean;
}

// Color display component props
export interface ColorDisplayProps {
    color: string;
    withAlpha: boolean;
    onClick: () => void;
}

// Color input component props
export interface ColorInputProps {
    value: string;
    mode: ColorPickerMode;
    withAlpha: boolean;
    onChange: (value: string) => void;
    onBlur: () => void;
}

// Alpha input component props
export interface AlphaInputProps {
    value: number | null;
    onChange: (value: number | null) => void;
    onBlur: () => void;
}
