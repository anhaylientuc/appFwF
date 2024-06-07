module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.js', '.jsx', '.json', '.svg', '.jpg', '.tsx'],
          alias: {
            '~': './src',
            '@components': './src/components',
            '@screens': './src/components/screens',
            '@shopPages': './src/components/screens/ShopPages',
            '@assets': './src/assets',
            '@common': './src/common',
            '@containers': './src/containers',
            '@navigators': './src/navigators',
            '@reducers': './src/reducers',
            '@theme': './src/theme',
            '@utils': './src/utils'
          }
        }
      ]
    ]
  }
}
