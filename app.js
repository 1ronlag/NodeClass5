const app = require('./server')

app.use('/', require('./src/routes/jewelersRoutes'))

module.exports = app