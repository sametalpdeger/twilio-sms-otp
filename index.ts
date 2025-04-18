import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express from 'express'
import { sendOTP } from './twilio-sms'


const app = express()

const { PORT } = process.env
const port = PORT || 8080  
const jsonParser= bodyParser.json()


app.use(jsonParser)


app.get('/', sendOTP)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})