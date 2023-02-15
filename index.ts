import express, { Express } from 'express'
import bodyParser from 'body-parser'
import infoUtils from './utils/info.util'

import echoRouter from './routes/echo.route'

const app: Express = express()
const name = infoUtils.NAME
const domain = infoUtils.DOMAIN
const port = infoUtils.PORT

//routes

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))

// route definitions
app.get('/', echoRouter)

app.listen(port, () => {
  console.log(`⚡️[${name}]: Server is running at ${domain}:${port}`)
})