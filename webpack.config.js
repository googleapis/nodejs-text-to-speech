module.exports = {
  entry: './src/browser.js',
  output: {
    library: '@google-cloud/text-to-speech',
    filename: './@google-cloud/text-to-speech.js',
  },
  node: {
    child_process: 'empty',
    fs: 'empty',
    crypto: 'empty',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /node_modules[\\/]retry-request[\\/]/,
        use: 'null-loader',
      },
      {
        test: /node_modules[\\/]https-proxy-agent[\\/]/,
        use: 'null-loader',
      },
      {
        test: /node_modules[\\/]gtoken[\\/]/,
        use: 'null-loader',
      },
    ],
  },
  mode: 'production',
};
