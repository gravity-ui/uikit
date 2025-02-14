export const BUTTON_VIEWS = [
    'normal', // Grey background, no border
    'action', // Branded background, no border
    'outlined', // No background, grey border
    'outlined-info', // No background, with info-type border color
    'outlined-success', // No background, with success-type border color
    'outlined-warning', // No background, with warning-type border color
    'outlined-danger', // No background, with danger-type border color
    'outlined-utility', // No background, with utility-type border color
    'outlined-action', // No background, with branded border color
    'raised', // With white background and shadow
    'flat', // No background, no border
    'flat-secondary', // No background, no border, secondary-type text color
    'flat-info', // No background, no border, info-type text color
    'flat-success', // No background, no border, success-type text color
    'flat-warning', // No background, no border, warning-type text color
    'flat-danger', // No background, no border, danger-type text color
    'flat-utility', // No background, no border, utility-type text color
    'flat-action', // No background, no border, branded text color
    'normal-contrast', // normal button appearance with contrast background
    'outlined-contrast', // outlined button appearance with contrast background
    'flat-contrast', // flat button appearance with contrast background
] as const;

export const BUTTON_ICON_SIZE_MAP = {
    xs: 12,
    s: 14,
    m: 16,
    l: 16,
    xl: 20,
} as const;
