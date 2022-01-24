import {create} from '@storybook/theming';

export const CloudTheme = create({
    base: 'light',

    colorPrimary: '#027bf3',
    colorSecondary: 'rgba(2, 123, 243, 0.6)',

    // Typography
    fontBase: '"Helvetica Neue", Arial, Helvetica, sans-serif',
    fontCode:
        '"SF Mono", "Menlo", "Monaco", "Consolas", "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "Courier", monospace',

    // Text colors
    textColor: 'black',
    textInverseColor: 'black',

    // Toolbar default and active colors
    barTextColor: 'silver',
    barSelectedColor: '#027bf3',
    // barBg: '#027bf3',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandUrl: 'https://github.com/yandex-cloud/uikit',
    brandTitle: `<div style="font-size: 18px; color: #027bf3; font-weight: 600; margin-top: -6px; margin-bottom: 2px;">UIKit</div>
                <div style="font-size: 14px;color: #7d7d7d;font-weight: 400;">Yandex.Cloud Components</div>`,
});
