module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/env',
      {
        modules: false,
        debug: process.env.NODE_ENV !== 'test',
      },
    ],
  ],
  plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
  env: {
    test: {
      presets: [['@babel/env', { modules: 'commonjs' }]],
    },
  },
};
