const express = require('express')
const server = express()
const { urlencoded } = require('body-parser')
const path = require('path');

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require("./routes/index")
const userRouter = require("./routes/user")
const matchRouter = require("./routes/matchmaking")

server.use('/', indexRouter)
server.use('/user', userRouter)
server.use('/match', matchRouter)

const port = 3000

server.listen(port, () =>{
    console.log("server on http://localhost:" + port)
})

module.exports = server;