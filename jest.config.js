module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: './tsconfig.test.json',
                // NodeNext keeps `import()` native, and Jest cannot run it without
                // --experimental-vm-modules: the lazy modules load with `require`, as in build/cjs
                astTransformers: {before: ['<rootDir>/build-utils/transform-dynamic-import.js']},
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!(@gravity-ui)/)'],
    coverageDirectory: './coverage',
    collectCoverageFrom: [
        'src/**/*.{ts,tsx,js,jsx}',
        '!src/demo/**/*',
        '!**/__stories__/**/*',
        '!**/*/*.stories.{ts,tsx}',
    ],
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/test-utils/setup-tests.ts'],
    setupFilesAfterEnv: ['<rootDir>/test-utils/setup-tests-after.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'jest-transform-css',
        // A relative `.js` names the TypeScript source, as it does for tsc (a dynamic import has to
        // carry the extension under `nodenext`)
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testMatch: ['**/*.test.[jt]s?(x)'],
    testPathIgnorePatterns: ['.visual.'],
};
