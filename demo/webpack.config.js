const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      // Alias for FnecJS packages
      'fnec': path.resolve(__dirname, '../FnecJS/packages/fnec/src/fnec.ts'),
      'fnec-renderer': path.resolve(__dirname, '../FnecJS/packages/fnec-renderer'),
      'fnec-transpiler': path.resolve(__dirname, '../FnecJS/packages/fnec-transpiler'),
      'fnec-shared': path.resolve(__dirname, '../FnecJS/packages/fnec-shared'),
      'fnec-scheduler': path.resolve(__dirname, '../FnecJS/packages/fnec-scheduler'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src/react'),
          path.resolve(__dirname, 'src/index.tsx')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        },
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src/fnec'),
        use: {
          loader: 'babel-loader',
          options: {
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
        },
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, '../FnecJS/packages'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'FnecJS vs React Demo',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    hot: true,
    open: true,
  },
  devtool: 'source-map',
};
