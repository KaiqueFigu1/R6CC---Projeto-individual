const express = require('express')
const server = express()
const { urlencoded } = require('body-parser')
var path = require('path');

server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require("./routes/index")

server.use('/', indexRouter)

const port = 3000

server.listen(port, () =>{
    console.log("Server listening at " + port)
})

module.exports = server;