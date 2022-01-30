module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    testMatch: ['<rootDir>/src/**/*.test.ts?(x)'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coverageDirectory: './coverage',
    testEnvironment: 'node',
    setupFiles: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'jest-transform-css',
    },
};
