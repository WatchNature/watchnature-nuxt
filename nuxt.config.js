require('dotenv').config()

module.exports = {
  head: {
    title: 'Modern Social Field Guide',
    titleTemplate: '%s - Watch Nature',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-capable', content: 'no' },
      { name: 'apple-mobile-web-app-title', content: 'Watch Nature' },
      {
        hid: 'description',
        name: 'description',
        content: 'Building a modern social field guide to life on Earth and the community to power it.'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:title', property: 'og:title', content: 'Watch Nature' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Building a modern social field guide to life on Earth and the community to power it.'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://alpha.watchnature.co'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://alpha.watchnature.co/images/wn.png'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'apple-touch-icon', href: '/icon.png' }]
  },
  loading: { color: '#3B8070' },
  env: {
    API_URL: process.env.API_URL,
    API_AUTH_URL: process.env.API_AUTH_URL,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    GA_ID: process.env.GA_IDK
  },
  css: ['tachyons/css/tachyons.css'],
  plugins: [],
  modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
  axios: {
    credentials: false,
    redirectError: {
      401: '/signin',
      403: '/signin'
    },
    requestInterceptor: (config, { store }) => {
      config.headers.common['Content-Type'] = 'application/json'
      config.headers.common['Accept'] = 'application/json'

      if (store.state.authToken) {
        config.headers.common['Authorization'] = `Bearer ${store.state.authToken}`
      }

      return config
    }
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
    vendor: ['fuse.js', 'js-cookie', 'lodash', 'date-fns', 'axios', 'vue2-google-maps']
  }
}
