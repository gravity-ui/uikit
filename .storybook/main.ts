import type {StorybookConfig} from '@storybook/react-webpack5';
import type {RuleSetRule} from 'webpack';

import {sassFunctions} from '../build-utils/sass-functions';

// `import src from './file.tsx?raw'` must return the SOURCE of the file (the
// Code panel of a story shows a copyable example). The babel rule of storybook
// matches .ts/.tsx by path and ignores the query, while webpack applies EVERY
// matching rule — so `?raw` would go through babel and the panel would get the
// compiled output (JSX → _jsx, types stripped). `.md?raw` (the README in
// Docs.mdx) is fine: no babel rule matches .md. The fix is local: `?raw` is
// excluded from every babel/ts rule, and such imports are served as
// asset/source.
const RAW_QUERY = /raw/;

type LooseRule = RuleSetRule | false | null | undefined | '' | 0;

function excludeRawFromScriptRules(rules: LooseRule[] | undefined) {
    if (!rules) {
        return;
    }
    for (const rule of rules) {
        if (!rule || typeof rule !== 'object') {
            continue;
        }
        if (Array.isArray(rule.oneOf)) {
            excludeRawFromScriptRules(rule.oneOf);
        }
        // Rules that compile scripts are recognized by their test on js/ts/jsx/tsx
        const test = rule.test;
        const matchesScript =
            test instanceof RegExp &&
            ['.ts', '.tsx', '.js', '.jsx', '.mjs'].some((ext) => test.test(`file${ext}`));
        if (matchesScript && rule.resourceQuery === undefined) {
            rule.resourceQuery = {not: [RAW_QUERY]};
        }
    }
}

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
                    },
                ],
            },
        },
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
        if (configType === 'DEVELOPMENT') {
            webpackConfig.devtool = 'source-map';
        }
        const rules = (webpackConfig.module?.rules ?? []) as RuleSetRule[];
        excludeRawFromScriptRules(rules);
        // A dedicated `?raw` rule → the raw text of the module (after the
        // exclusion above babel no longer touches such imports)
        rules.unshift({resourceQuery: RAW_QUERY, type: 'asset/source'});
        return webpackConfig;
    },
};

export default config;
