import type {StorybookConfig} from '@storybook/react-webpack5';
import type {RuleSetRule} from 'webpack';

import {sassFunctions} from '../build-utils/sass-functions';

// `import src from './file.tsx?raw'` должен отдавать ИСХОДНИК файла (панель
// Code стори показывает копируемый пример). Но babel-правило сторибука
// матчит .tsx/.ts по пути, игнорируя query, а webpack применяет ВСЕ
// подходящие правила — без этого `?raw` прогонялся бы через babel и в панель
// попадал бы компилят (JSX → _jsx, типы вырезаны). Для .md?raw (README в
// Docs.mdx) проблемы нет: .md babel-правило не матчит. Чиним точечно:
// исключаем `?raw` из всех babel/ts-правил и отдаём такие импорты как
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
        // Правила, компилирующие скрипты, узнаём по test на js/ts/jsx/tsx
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
        // Выделенное правило `?raw` → сырой текст модуля (после исключения
        // выше babel такие импорты уже не трогает)
        rules.unshift({resourceQuery: RAW_QUERY, type: 'asset/source'});
        return webpackConfig;
    },
};

export default config;
