'use strict'

var validator = require('validator');
const bcrypt = require('bcryptjs');
var User = require('../models/user');
const jwt = require('jsonWebToken');
const SECRET_KEY = 'secretkey123456';
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/user');
const { response } = require('../app');
const { param } = require('../routes/experiencia');

var controller = {
    datosCurso: (req, res) => {
        var hola = req.body.hola
        return res.status(200).send({
            curso: "Master JS",
            autor: "Javier Casas",
            url: "CVJavierCasas.es",
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: "Soy la acción Test de mi controlador de formacion"
        });
    },

    login: (req, res) => {
        var params = req.body;
        var userData = {
            nombre: params.nombre,
            apellidos: params.apellidos,
            email: params.email,
            password: params.password
        }
        User.findOne({ email: userData.email }, (err, user) => {
            console.log('YYYYYYYYYYYYYYYYY', err);
            if (err) return res.status(500).send('Error en la autenticación');
            if (!user) {
                res.status(404).send({ message: "Usuario no encontrado" });
            } else {
                const resultPassword = bcrypt.compareSync(userData.password, user.password);
                if (resultPassword) {
                    const expiresIn = 24 * 60 * 60;
                    const accessToken = jwt.sign({ id: userData.id }, SECRET_KEY, { expiresIn: expiresIn });
                    const dataUser = {
                        nombre: user.nombre,
                        email: user.email,
                        accessToken: accessToken,
                        expiresIn: expiresIn,

                    }
                    res.status(200).send({
                        dataUser
                    });
                } else {
                    res.status(409).send({ message: 'Something is wrong' });
                }
            }
        })
    },

    register: (req, res) => {

        //recoger parámetros por post
        var params = req.body;
        //crear objeto a guardar
        var user = new User();
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
        //Asignar valores
        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.email = params.email;
        user.password = bcrypt.hashSync(params.password);

        const dataUser = {
                nombre: user.nombre,

                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn,

            }
            //guardar experiencia
        user.save((err, userStored) => {
            if (err && err.code === 11000) return res.status(409).send('El email ya existe');
            console.log('XXXXXXXXXXXXX', err);
            if (err || !userStored) {
                return res.status(404).send({
                    status: 'error',
                    message: "El usuario no se ha guardado"
                });
            }
            //Devolver respuesta
            return res.status(200).send({
                status: 'success',
                user: dataUser
            });
        })

    },



    save: (req, res) => {
        //recoger parámetros por post
        var params = req.body;

        // validar datos (validator)
        try {
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellidos = !validator.isEmpty(params.apellidos);
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: validate_nombre


            });
        }
        if (validate_nombre && validate_apellidos && validate_email && validate_password) {

            //crear objeto a guardar
            var user = new User();

            //Asignar valores
            user.nombre = params.nombre;
            user.apellidos = params.apellidos;
            user.email = params.email;
            user.password = params.password;

            //guardar experiencia
            user.save((err, userStored) => {
                if (err || !userStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: "El usuario no se ha guardado"
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    user: userStored,
                    message: "Usuario guardado"
                });
            })
        } else {
            return res.status(200).send({
                status: 'error',
                message: "Los datos no son válidos"
            });
        }
    },

    getUsers: (req, res) => {

        var query = User.find();
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }
        //find
        query.sort('_id').exec((err, users) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "No se han podido obtener los datos"
                });
            } else if (!users) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay formaciones para mostrar"
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    users
                });
            }

        });

    },

    getUser: (req, res) => {

        //recoger id de la url
        var userId = req.params._id;

        //Comprobar que existe
        if (!userId || userId == null) {
            return res.status(404).send({
                status: 'error',
                message: "No existe el usuario selecionado"
            });
        }
        //Buscar el artículo
        User.findById(userId, (err, user) => {
            if (err || !user) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el usuario solicitado"
                });
            }
            //Devolver el resultado
            return res.status(404).send({
                status: 'success',
                user
            });
        });

    },

    update: (req, res) => {
        //Recoger el ID del artículo por la url
        var userId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;
        //Validar los datos
        try {
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellidos = !validator.isEmpty(params.apellidos);
            var validate_email = !validator.isEmpty(params.email);
            var validate_password = !validator.isEmpty(params.password);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_nombre && validate_apellidos && validate_email && validate_password) {
            //Find and update
            User.findByIdAndUpdate({ _id: userId }, params, { new: true }, (err, userUpdated) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: "Error al actualizar"
                    });
                }

                if (!userUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No existe la formación"
                    });
                }

                return res.status(404).send({
                    status: 'success',
                    user: userUpdated
                });
            });
        } else {
            return res.status(200).send({
                status: 'error',
                message: "La validación no es correcta"
            });
        }
    },
    delete: (req, res) => {
        // Recoger el id del trabajo a eliminar
        var userId = req.params.id;
        // Find and delete
        User.findOneAndDelete({ _id: userId }, (err, userDeleted) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: "Error al borrar"
                });
            }

            if (!userDeleted) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el usuario a borrar"
                });
            }

            return res.status(404).send({
                status: 'success',
                user: userDeleted
            });
        });
    },

}; //end controller

module.exports = controller;