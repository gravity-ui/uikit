import type {StorybookConfig} from '@storybook/core-common';

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/preset-scss',
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
    ],
    // typescript: {
    //     check: true,
    //     checkOptions: {},
    //     reactDocgen: 'react-docgen-typescript',
    //     reactDocgenTypescriptOptions: {
    //         setDisplayName: false,
    //         shouldExtractLiteralValuesFromEnum: true,
    //         compilerOptions: {
    //             allowSyntheticDefaultImports: true,
    //             esModuleInterop: true,
    //         },
    //     },
    // },
    // webpackFinal: (storybookBaseConfig) => {
    //     // без этого fileName в context.parameters в продакшн сборке становится цифрой, а не путём, и ссылку на сорсы не сформировать
    //     storybookBaseConfig.optimization.moduleIds = 'named';
    //
    //     return storybookBaseConfig;
    // },
};

module.exports = config;
