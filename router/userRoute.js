const { Router } = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const { postlogin, post } = require('../controller/userController');
const { getAll } = require('../controller/commoncontroller');
const routeName = "user";
var jwt = require('jsonwebtoken');
var salt = bcrypt.genSaltSync(10);
var secretKey = 'STkey';

router.post('/UserForLogin', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    post(req.body, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 200;
            res.json(result);
        }
    })
});

router.post('/login', (req, res) => {
    postlogin(req.body, (err, result) => {
        if (err) {
            res.status(400).send({ message: 'Email ID Not Exist', result: false });
        } else {
            var hash = bcrypt.compareSync(req.body.password, result.password);
            if (hash) {
                var token = jwt.sign({ email: result.email }, secretKey, {
                    expiresIn: 86400 // expires in 24 hours
                });

                res.status(200).send({ message: 'Login Successfully', result: true, token: token, role: result.role, id: result.id });
            } else {
                res.status(400).send({ message: 'Password In Correct', result: false });
            }
        }
    });
});

router.get('/', (req, res) => {
    getAll(routeName, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        } else {
            res.statusCode = 200;
            res.json(result);
        }
    });
});
module.exports = router;
