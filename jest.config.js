const nextJest = require('next/jest.js')
 
const createJestConfig = nextJest({
  dir: './',
})
 
const config = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['components/**/*.js', 'pages/**/*.js'],
  coverageReporters: ['lcov', 'text'],
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
}
 
module.exports = createJestConfig(config)

