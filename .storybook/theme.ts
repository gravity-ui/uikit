import {create} from 'storybook/theming';
import type {ThemeVarsPartial} from 'storybook/theming';

import pkg from '../package.json';

function renderBrandTitle(theme: 'light' | 'dark') {
    const titleColor = theme === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)';
    const descriptionColor = theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)';
    const logo =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 125" width="32" height="32" fill="none"><path fill="url(#a)" fill-rule="evenodd" d="M103.064 103.055c23.649-23.649 23.649-61.991 0-85.64L86.058 34.421c13.898 14.429 13.84 37.285-.254 51.379s-36.95 14.152-51.38.254l-17 17.001c23.649 23.649 61.991 23.649 85.64 0" clip-rule="evenodd"/><mask id="b" width="125" height="126" x="0" y="-1" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#F37" fill-rule="evenodd" d="M17.74 17.736C-2.88 38.356-5.521 70.147 9.817 93.63c1.09 1.733 1.635 2.599 1.95 3.41.727 1.874.832 3.422.363 5.377-.203.846-.721 1.984-1.757 4.26-3.458 7.596-4.205 13.244-1.578 15.87 7.412 7.413 31.148-4.306 70.301-43.459s50.872-62.89 43.46-70.302c-2.627-2.626-8.274-1.879-15.869 1.578-2.286 1.04-3.429 1.56-4.278 1.763-1.946.465-3.484.362-5.35-.357-.805-.31-1.665-.848-3.366-1.916C70.206-5.529 38.378-2.902 17.74 17.736m50.165 50.161c14.261-14.26 23.878-27.765 17.263-34.38-14.396-14.396-37.626-14.505-51.887-.244-14.261 14.26-14.152 37.491.244 51.887 6.615 6.615 20.12-3.002 34.38-17.263" clip-rule="evenodd"/></mask><g mask="url(#b)"><path fill="#F37" fill-rule="evenodd" d="M17.74 17.736C-2.88 38.356-5.521 70.147 9.817 93.63c1.09 1.733 1.635 2.599 1.95 3.41.727 1.874.832 3.422.363 5.377-.203.846-.721 1.984-1.757 4.26-3.458 7.596-4.205 13.244-1.578 15.87 7.412 7.413 31.148-4.306 70.301-43.459s50.872-62.89 43.46-70.302c-2.627-2.626-8.274-1.879-15.869 1.578-2.286 1.04-3.429 1.56-4.278 1.763-1.946.465-3.484.362-5.35-.357-.805-.31-1.665-.848-3.366-1.916C70.206-5.529 38.378-2.902 17.74 17.736m50.165 50.161c14.261-14.26 23.878-27.765 17.263-34.38-14.396-14.396-37.626-14.505-51.887-.244-14.261 14.26-14.152 37.491.244 51.887 6.615 6.615 20.12-3.002 34.38-17.263" clip-rule="evenodd"/><g filter="url(#c)"><path fill="#FF0" d="M19.03 88C6.426 68.68 8.597 42.522 25.543 25.556 42.507 8.572 68.673 6.412 87.978 19.08c1.388.873 2.093 1.313 2.753 1.567 1.533.592 2.797.677 4.396.295.698-.167 1.638-.595 3.516-1.451 6.242-2.845 14.999-8.953 18.072-5.877 4.72 4.726-9.484 29.292-41.662 61.507s-56.716 47.351-61.436 42.626c-3.074-3.077 3.028-12.76 5.87-19.01.852-1.873 1.277-2.81 1.444-3.505.386-1.609.3-2.882-.298-4.425-.259-.667-.707-1.38-1.604-2.805z"/></g></g><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="rotate(45 -43.592 103.062)scale(59.7564)" gradientUnits="userSpaceOnUse"><stop offset=".646" stop-color="#FF0"/><stop offset="1" stop-color="#F37"/></radialGradient><filter id="c" width="144.672" height="145.669" x="-8.053" y="-8.056" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_1776_29897" stdDeviation="9.509"/></filter></defs></svg>';

    return `
<div style="display: flex; align-items: flex-start">
    <div style="flex-shrink: 0; line-height: 0">${logo}</div>
    <div style="margin-inline-start: 8px">
        <div style="font-size: 26px; line-height: 32px; color: ${titleColor}; font-weight: 600;">Gravity&nbsp;UI</div>
        <div style="font-size: 14px; color: ${descriptionColor}; font-weight: 400;">UIKit&nbsp;v${pkg.version}</div>
    </div>
</div>
    `.trim();
}

const common: Omit<ThemeVarsPartial, 'base'> = {
    // Typography
    fontBase: '"Helvetica Neue", Arial, Helvetica, sans-serif',
    fontCode:
        '"SF Mono", "Menlo", "Monaco", "Consolas", "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "Courier", monospace',

    brandUrl: 'https://gravity-ui.com/',
};

export const CloudThemeLight = create({
    base: 'light',
    ...common,
    brandTitle: renderBrandTitle('light'),
});

export const CloudThemeDark = create({
    base: 'dark',
    ...common,
    brandTitle: renderBrandTitle('dark'),
});

export const themes = {
    light: CloudThemeLight,
    dark: CloudThemeDark,
};
