const express = require('express')
const Sequelize = require('sequelize')
const credentials = require('../db/credentials.json')

const router = express.Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sequelize = new Sequelize(credentials.db, credentials.user, credentials.password, {
    host: 'localhost',
    dialect: 'mysql'
});

router.post('/login', (req, res) => {
    const userData = {
        "email" : req.body.email,
        "password" : req.body.password
    }
    res.send(userData)
})

router.post('/singup', (req, res) => {
    console.log(req.body)
    let sql = `INSERT INTO usuarios VALUES 
    (null, '${req.body.nick}', '${req.body.email}', '${req.body.password}', 0, 0);`
    
    sequelize.query(sql, { type: Sequelize.QueryTypes.INSERT })
        .then(r => {
            console.log(r)
            res.send({
                status: 'ok'
            })
        }).catch(err => {
            console.error(`Ocorreu um erro ${err.errors[0].message} valor ${err.errors[0].value}`)
            res.send(err)
        })
})




module.exports = router