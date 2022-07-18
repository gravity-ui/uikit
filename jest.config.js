module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    transform: {
        '^.+\\.[jt]sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['node_modules/(?!(@yandex-cloud)/)'],
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
    },
};
