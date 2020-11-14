const express = require('express')
const router = express.Router()

const mapPool = [
    'Kafe Dostoyevsky',
    'Mansão',
    'Oregon',
    'Consulado',
    'Banco',
    'Canal',
    'Fronteira',
    'Clube',
    'Chalé'
]

router.get('/maps', (req, res) => {
    res.send(mapPool)
})






module.exports = router