module.exports = {
  'devServer': {
    'proxy': {
      '^/api': {
        'target': 'https://hub.getcns.tech'
      }
    }
  },
  'transpileDependencies': [
    'vuetify'
  ],
  chainWebpack: config => config.resolve.symlinks(false)
}
