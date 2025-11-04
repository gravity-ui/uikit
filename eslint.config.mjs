import baseConfig from '@gravity-ui/eslint-config';
import a11yConfig from '@gravity-ui/eslint-config/a11y';
import clientConfig from '@gravity-ui/eslint-config/client';
import importOrderConfig from '@gravity-ui/eslint-config/import-order';
import prettierConfig from '@gravity-ui/eslint-config/prettier';
import {defineConfig} from 'eslint/config';
import storybookPlugin from 'eslint-plugin-storybook';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';

export default defineConfig([
    ...baseConfig,
    ...clientConfig,
    ...prettierConfig,
    ...importOrderConfig,
    ...a11yConfig,
    ...storybookPlugin.configs['flat/recommended'],
    {
        rules: {
            'react/jsx-fragments': ['error', 'element'],
            'react/react-in-jsx-scope': 'off',
            'no-restricted-syntax': [
                'error',
                {
                    selector:
                        "ImportDeclaration[source.value='react'] :matches(ImportDefaultSpecifier, ImportSpecifier)",
                    message: "Please use `import * as React from 'react'` instead.",
                },
                {
                    selector: "TSTypeReference>TSQualifiedName[left.name='React'][right.name='FC']",
                    message: "Don't use React.FC",
                },
                {
                    selector: "ImportDeclaration[source.value='@testing-library/react']",
                    message: "Please use wrapper from 'test-utils/utils.tsx'.",
                },
                {
                    selector: "MemberExpression[object.name='React'][property.name='useId']",
                    message: "Please use 'src/hooks/useUniqId' instead.",
                },
            ],
            'jsx-a11y/no-autofocus': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
            complexity: 'off',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        rules: {
            '@typescript-eslint/prefer-ts-expect-error': 'error',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports',
                },
            ],
        },
    },
    {
        files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
        ignores: ['**/__tests__/**/*.visual.test.*'],
        extends: [testingLibraryPlugin.configs['flat/react']],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    {
        files: ['**/__stories__/**/*.[jt]s?(x)'],
        rules: {
            'no-console': 'off',
        },
    },
    {
        files: ['**/*.js', '!src/**/*'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['**/__tests__/**/*.visual.test.*'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    {
        ignores: ['build', 'storybook-static', 'playwright/.cache*'],
    },
]);
