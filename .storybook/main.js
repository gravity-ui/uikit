const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/preset-scss', '@storybook/addon-essentials'],
    typescript: {
        check: true,
        checkOptions: {},
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            setDisplayName: false,
            shouldExtractLiteralValuesFromEnum: true,
            compilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
            },
        },
    },
    webpackFinal: (storybookBaseConfig) => {
        const svgIconsPath = path.resolve(__dirname, '../assets/icons');
        const storybookAssetsRule = storybookBaseConfig.module.rules.find((rule) =>
            rule.test.test('.svg'),
        );

        storybookAssetsRule.exclude = [...(storybookAssetsRule.exclude || []), svgIconsPath];

        storybookBaseConfig.module.rules.unshift({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            include: [svgIconsPath],
            loader: 'svg-sprite-loader',
            options: {
                extract: true,
                spriteFilename: 'sprite-[hash:6].svg',
            },
        });
        storybookBaseConfig.plugins.push(new SpriteLoaderPlugin({plainSprite: true}));
        // без этого fileName в context.parameters в продакшн сборке становится цифрой, а не путём, и ссылку на сорсы не сформировать
        storybookBaseConfig.optimization.moduleIds = 'named';

        return storybookBaseConfig;
    },
};
