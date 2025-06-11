'use strict'

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer((handler) => {
    const { Server } = require('@adonisjs/http-server')
    return new Server(handler).listen(
      process.env.PORT || 3333,
      process.env.HOST || '0.0.0.0'
    )
  })
  .catch(console.error)
