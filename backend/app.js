const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const {readdirSync} = require('fs')
const { route } = require('./routes/transactions')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

// middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route))) // here we are creating a base URL for the API


// creating an API
app.get('/', (req, res)=> {
    res.send('Hello World')
})
// creating a server
const server = () =>{
    db() //calling to connect the Database
    app.listen(PORT, () => {
        console.log('listening to PORT: ', PORT)
    })
}

server() // calling the function