module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!**/test/**',
        '!**/config/**'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@test/(.*)$': '<rootDir>/test/$1',
    },
    verbose: false,
};