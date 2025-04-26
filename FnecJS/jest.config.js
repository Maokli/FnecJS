module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript'
        ],
        plugins: [
          ['@babel/plugin-transform-react-jsx', {
            pragma: 'FnecTranspiler.createElement',
            pragmaFrag: 'FnecTranspiler.Fragment'
          }]
        ]
      }
    ]
  },
  testMatch: ['**/__tests__/**/*.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^fnec-renderer(.*)$': '<rootDir>/packages/fnec-renderer$1',
    '^fnec-transpiler(.*)$': '<rootDir>/packages/fnec-transpiler$1',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
};