const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  // Get the default Expo Webpack config
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add custom aliases
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    'react-native$': 'react-native-web',
    '../Utilities/Platform': 'react-native-web/dist/exports/Platform',
    '../../Utilities/Platform': 'react-native-web/dist/exports/Platform',
    './Platform': 'react-native-web/dist/exports/Platform',
  };

  // Customize the config before returning it
  return config;
};
