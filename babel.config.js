module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['nativewind/babel'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
