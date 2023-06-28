export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GitStash',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/static/main.css'],

  loading: {
    color: 'black',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/chakra
    '@chakra-ui/nuxt',
    // https://go.nuxtjs.dev/emotion
    '@nuxtjs/emotion',
    '@nuxtjs/axios',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  chakra: {
    extendTheme: {
      fonts: {
        heading: 'Steppe, sans-serif',
        body: 'Steppe, sans-serif',
      },
    },
  },

  axios: {
    proxy: true,
    prefix: '/api',
  },

  proxy: {
    '/api': 'http://localhost:4200',
  },

  render: {
    fallback: {
      static: {
        handlers: {
          '.css': false,
          '.html': false,
          '.htm': false,
          '.png': false,
          '.jpg': false,
          '.jpeg': false,
          '.gif': false,
          '.svg': false,
          '.webp': false,
          '.bmp': false,
          '.ico': false,
          '.js': false,
          '.json': false,
          '.map': false,
          '.txt': false,
          '.text': false,
          '.md': false,
        },
      },
    },
  },
}
