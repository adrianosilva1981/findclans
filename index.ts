import express, { Express, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import Info from './domains/info/Info'

// importing routes
import infoRouter from './routes/info.route'
import authRouter from './routes/auth.route'

const app: Express = express()
const { name, domain, port } = Info.getInfo()


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))

// route definitions
// criar uma rota para unauthorized
app.get('/unauthorized', (req: Request, res: Response) => { res.status(401).send({ message: 'Unauthorized' }) })

app.use('/', infoRouter)
app.use('/auth', authRouter)

// api listen
app.listen(port, () => {
  console.log(`⚡️[${name}]: Server is running at ${domain}:${port}`)
})