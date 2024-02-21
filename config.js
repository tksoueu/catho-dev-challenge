module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}'],
  coverageReporters: ['lcov', 'text'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  presets: ['@babel/preset-react', '@babel/preset-env', {targets: {node: 'current'}},
  '@babel/preset-typescript'],
}