const jwt = require('jsonWebToken');
const bcrypt = require('bcryptjs');
const { response } = require('../app');
const User = require('../models/user_old');
const SECRET_KEY = 'secretkey123456';
exports.register = (req, res, next) => {
    const newUser = {
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        email: req.body.email,
        password: rew.body.password
    }

    User.register(newUser, (err, user) => {
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
                expiresIn: expiresIn
            });


        //response
        response.send({ user })
    });
}

exports.login = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Server error');
        if (!user) {
            res.status(409).send({ message: 'Something is wrong' });
        } else {
            const resultPassword = userData.password;
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                res.send({ userData });
            } else {
                res.status(409).send({ message: 'Something is wrong' });
            }
        }
    })
}