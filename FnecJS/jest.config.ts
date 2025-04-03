module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
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
            pragma: 'Fnec.createElement',
            pragmaFrag: 'Fnec.Fragment',
          }]
        ]
      }
    ]
  },
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};