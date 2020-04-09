module.exports = {
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'interfaces',
    '<rootDir>/src/database/migration',
  ],
};
