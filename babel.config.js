const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    isDevelopment ? ['react-refresh/babel'] : [],
    ["@babel/plugin-transform-runtime", { "regenerator": true }],
  ],
};
