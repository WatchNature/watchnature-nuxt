const COOKIE_MAX_AGE_DAYS = 1000 * 60 * 60 * 24 * 30 // 30 days
const isProd = process.env.NODE_ENV === 'production'

const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = require('express')()
const cors = require('cors')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '8080'

// Body parser, to access req.body
app.use(bodyParser.json())
app.use(cors())

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
const redisClient = require('redis').createClient(redisUrl)
const RedisStore = require('connect-redis')(session)

app.use(session({
  proxy: true,
  store: new RedisStore({client: redisClient}),
  secret: process.env.SESSION_SECRET || 'a great secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: COOKIE_MAX_AGE_DAYS,
    secure: isProd
  }
}))

const serverController = require('./server-controller')
app.post('/sessions/signin', serverController.createSession)
app.post('/sessions/signout', serverController.deleteSession)

// We instantiate Nuxt.js with the options
const nuxtConfig = require('./nuxt.config.js')
const nuxt = new Nuxt(nuxtConfig)

// No build in production
const promise = (isProd ? Promise.resolve() : new Builder(nuxt).build())

promise
  .then(() => {
    app.use(nuxt.render)
    app.listen(port, host)
    console.log(`Server is listening on ${host}:${port}`)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
