const express = require('express');
const router = express.Router();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

router.post('/login', (req, res) => {
    const userData = {
        "email" : req.body.email,
        "password" : req.body.password
    }
    res.send(userData)
})

router.post('/singup', (req, res) => {
    const userData = {
        "email" : req.body.email,
        "nickname" : req.body.nickname,
        "password" : req.body.password
    }

    
})




module.exports = router