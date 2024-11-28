import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
    framework: '@storybook/react-webpack5',
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
    docs: {
        defaultName: 'Docs',
    },
    addons: [
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.scss$/i,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                ],
            },
        },
        {name: '@storybook/addon-essentials', options: {backgrounds: false}},
        './theme-addon/register.tsx',
        '@storybook/addon-a11y',
        '@storybook/addon-webpack5-compiler-babel',
        {
            name: '@storybook/addon-storysource',
            options: {
                loaderOptions: {
                    injectStoryParameters: false,
                },
            },
        },
    ],
    typescript: {
        check: false, // `false` is default value, but `checked` field is required in types.
        reactDocgen: 'react-docgen-typescript',
    },
};

export default config;
