import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

// importing routes
import infoRouter from './src/routes/info.route'
import authRouter from './src/routes/auth.route'
import characterRouter from './src/routes/character.route'
import userRouter from './src/routes/user.route'
import clanRouter from './src/routes/clan.route'

// import classes
import GetInfo from './src/modules/info/useCases/getInfo/GetInfo'

const getInfo = new GetInfo()
const app: Express = express()
const { name, domain, port } = getInfo.execute()


app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(fileUpload());

// route definitions
app.use('/', infoRouter)
app.use('/auth', authRouter)
app.use('/character', characterRouter)
app.use('/user', userRouter)
app.use('/clans', clanRouter)

app.get('/unauthorized', (req: Request, res: Response) => {
  res.status(401).send({ message: 'Unauthorized' })
})

// api listen
app.listen(port, () => {
  console.log(`⚡️[${name}]: Server is running at ${domain}:${port}`)
})