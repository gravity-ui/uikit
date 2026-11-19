export const Modes = {
    Hex: 'HEX',
    Rgb: 'RGB',
} as const;
export type Modes = (typeof Modes)[keyof typeof Modes];
