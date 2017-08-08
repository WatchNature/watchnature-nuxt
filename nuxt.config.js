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
    API_URL: process.env.API_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    GA_ID: process.env.GA_IDK
  },
  modules: [
    '@nuxtjs/icon',
    '@nuxtjs/cssnano',
    ['@nuxtjs/axios', {
      debug: true
    }]
  ],
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
