module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // Plugin requerido no Reanimated que é requerido no Moti
  };
};
