const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')


dotenv.config()

const app = express()

app.use(express.json())

app.use(cors())

app.use('/users', userRouter)
app.use('/note', noteRouter)

app.get('/', (req, res) => {
    res.send('Hellow From backend! ')
})

mongoose.connect(process.env.MONGO_URL).then(() => {
app.listen(5000, () => {
    console.log(`server starting on 5000`)
})
}).catch(error => {
    console.log(error)
})

