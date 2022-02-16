module.exports = {
    verbose: true,
    moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
    rootDir: '.',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    coverageDirectory: './coverage',
    testEnvironment: 'jsdom',
    setupFiles: ['<rootDir>/src/setup-tests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'jest-transform-css',
    },
};
