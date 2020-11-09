var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})

router.get('/teste', (req, res) => {
    res.sendFile('teste.html', { root: './public' });
})

module.exports = router