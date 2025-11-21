module.exports = {
  presets: [
    '@react-native/babel-preset',
    'nativewind/babel'
  ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      }
    ],
    'react-native-reanimated/plugin', // Must be last
  ],
};