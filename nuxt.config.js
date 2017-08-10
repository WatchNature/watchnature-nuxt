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
    API_AUTH_URL: process.env.API_AUTH_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    GA_ID: process.env.GA_IDK
  },
  css: [
    'tachyons/css/tachyons.css'
  ],
  plugins: [],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/icon',
    '@nuxtjs/cssnano',
    ['@nuxtjs/axios', {
      credentials: false,
      requestInterceptor: (config, { store }) => {
        config.headers.common['Content-Type'] = 'application/json'
        config.headers.common['Accept'] = 'application/json'

        if (store.state.authToken) {
          config.headers.common['Authorization'] = `Bearer ${store.state.authToken}`
        }

        return config
      }
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
