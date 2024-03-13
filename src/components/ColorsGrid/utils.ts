export type Color = string | null;

const parseRgba = (color: string) => {
    return color
        .slice(color.indexOf('(') + 1, -1)
        .split(', ')
        .map(Number);
};

const getComputedColor = (color: string) => {
    const element = document.createElement('div');

    element.style.color = color;
    document.body.appendChild(element);

    const computedColor = window.getComputedStyle(element).color;

    element.remove();

    return computedColor;
};

export const getContrastColor = (color: string | null, theme: string) => {
    const defaultColor = theme.startsWith('light')
        ? 'var(--g-color-text-dark-primary)'
        : 'var(--g-color-text-light-primary)';

    if (!color) {
        return defaultColor;
    }

    const rgba = getComputedColor(color);

    if (!rgba) {
        return defaultColor;
    }

    const [r, g, b, a = 1] = parseRgba(rgba);

    if (a < 0.5) {
        return defaultColor;
    }

    return (r * 0.299 + g * 0.587 + b * 0.114) * a > 186
        ? 'var(--g-color-text-dark-primary)'
        : 'var(--g-color-text-light-primary)';
};
