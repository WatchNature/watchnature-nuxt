require('dotenv').config()

module.exports = {
  head: {
    title: 'Watch Nature',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  env: {
    URL: 'http://localhost:4000',
    ENV: 'development',
    API_BASE_URL: 'http://localhost:4000/api',
    APP_BASE_URL: 'http://localhost:4000',
    GOOGLE_MAPS_API_KEY: 'AIzaSyCVahUUvHx_ir4b0NE9_TiENsnJ4P8Ncz8',
    IMGIX_SOURCE: '',
    IMGIX_SOURCE_HOSTNAME: '',
    DOCUMENT_TITLE_BASE: '[DEV] Watch Nature',
    DOCUMENT_TITLE_SEPARATOR: '»',
    GA_ID: ''
  },
  build: {
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'fuse.js',
      'js-cookie',
      'lodash',
      'date-fns',
      'axios',
      'vue2-google-maps'
    ]
  }
}
