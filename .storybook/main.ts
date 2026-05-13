import type {StorybookConfig} from '@storybook/react-webpack5';

import {sassFunctions} from '../build-utils/sass-functions.js';

const config: StorybookConfig = {
    framework: '@storybook/react-webpack5',
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
    docs: {
        defaultName: 'Docs',
    },
    addons: [
        './theme-addon/register.tsx',
        '@storybook/addon-a11y',
        '@storybook/addon-webpack5-compiler-babel',
        '@storybook/addon-docs',
    ],
    typescript: {
        check: false, // `false` is default value, but `checked` field is required in types.
        reactDocgen: 'react-docgen-typescript',
    },
    webpackFinal: (webpackConfig, {configType}) => {
        webpackConfig.resolve = webpackConfig.resolve ?? {};
        webpackConfig.resolve.alias = {
            ...(webpackConfig.resolve.alias ?? {}),
            '@storybook/addon-docs$': '@storybook/addon-docs/blocks',
        };

        webpackConfig.module = webpackConfig.module ?? {rules: []};
        webpackConfig.module.rules = webpackConfig.module.rules ?? [];
        webpackConfig.module.rules.push({
            test: /\.(css|scss)$/i,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            functions: sassFunctions,
                        },
                    },
                },
            ],
        });

        if (configType === 'DEVELOPMENT') {
            webpackConfig.devtool = 'source-map';
        }
        return webpackConfig;
    },
};

export default config;
