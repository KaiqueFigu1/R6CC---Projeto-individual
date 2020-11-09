var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' })
})

router.get('/lobby', (req, res) => {
    res.sendFile('lobby.html', { root: './public' });
})

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './public' });
})

router.get('/leaderboard', (req, res) => {
    res.sendFile('leaderboard.html', { root: './public' });
})

router.get('/cadastro', (req, res) => {
    res.sendFile('cadastro.html', { root: './public' });
})

module.exports = router