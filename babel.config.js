module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Required for Filament (if it uses Worklets)
    'react-native-worklets-core/plugin',

    // Required if using Reanimated (e.g., for UI animations alongside Filament)
    [
      'react-native-reanimated/plugin',
      {
        processNestedWorklets: true, // Needed for complex animations
        enableFabric: true, // Enable if using React Native Fabric (New Architecture)
      },
    ],
  ],
};
