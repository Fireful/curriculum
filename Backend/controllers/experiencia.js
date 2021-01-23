'use strict'

var validator = require('validator');
var Experiencia = require('../models/experiencia');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/experiencia');

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
            message: "Soy la acción Test de mi controlador de experiencia"
        });
    },
    save: (req, res) => {
        //recoger parámetros por post
        var params = req.body;

        // validar datos (validator)
        try {
            var validate_start = !validator.isEmpty(params.inicio);
            var validate_end = !validator.isEmpty(params.fin);
            var validate_empresa = !validator.isEmpty(params.empresa);
            var validate_puesto = !validator.isEmpty(params.puesto);
            var validate_contenido = !validator.isEmpty(params.contenido);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_start && validate_end && validate_empresa && validate_puesto && validate_contenido) {

            //crear objeto a guardar
            var experiencia = new Experiencia();

            //Asignar valores
            experiencia.inicio = params.inicio;
            experiencia.fin = params.fin;
            experiencia.empresa = params.empresa;
            experiencia.puesto = params.puesto;
            experiencia.logo = null;
            experiencia.contenido = params.contenido;

            //guardar experiencia
            experiencia.save((err, jobStored) => {
                if (err || !jobStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: "La experiencia no se ha guardado"
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    experiencia: jobStored
                });
            })
        } else {
            return res.status(200).send({
                status: 'error',
                message: "Los datos no son válidos"
            });
        }
    },

    getJobs: (req, res) => {

        var query = Experiencia.find({});
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }
        //find
        query.sort('-_id').exec((err, jobs) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "No se han podido obtener los datos"
                });
            } else if (!jobs) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay trabajos para mostrar"
                });
            } else {
                return res.status(404).send({
                    status: 'success',
                    jobs
                });
            }

        });

    },

    getArticle: (req, res) => {

        //recoger id de la url
        var jobId = req.params.id;

        //Comprobar que existe
        if (!jobId || jobId == null) {
            return res.status(404).send({
                status: 'error',
                message: "No existe el trabajo selecionado"
            });
        }
        //Buscar el artículo
        Experiencia.findById(jobId, (err, job) => {
            if (err || !job) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el trabajo solicitado"
                });
            }
            //Devolver el resultado
            return res.status(404).send({
                status: 'success',
                job
            });
        });

    },

    update: (req, res) => {
        //Recoger el ID del artículo por la url
        var jobId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;
        //Validar los datos
        try {
            var validate_start = !validator.isEmpty(params.inicio);
            var validate_end = !validator.isEmpty(params.fin);
            var validate_empresa = !validator.isEmpty(params.empresa);
            var validate_puesto = !validator.isEmpty(params.puesto);
            var validate_contenido = !validator.isEmpty(params.contenido);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_start && validate_end && validate_empresa && validate_puesto && validate_contenido) {
            //Find and update
            Experiencia.findByIdAndUpdate({ _id: jobId }, params, { new: true }, (err, jobUpdated) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: "Error al actualizar"
                    });
                }

                if (!jobUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No existe el artículo"
                    });
                }

                return res.status(404).send({
                    status: 'success',
                    job: jobUpdated
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
        var jobId = req.params.id;
        // Find and delete
        Experiencia.findOneAndDelete({ _id: jobId }, (err, jobDeleted) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: "Error al borrar"
                });
            }

            if (!jobDeleted) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el trabajo a borrar"
                });
            }

            return res.status(404).send({
                status: 'success',
                job: jobDeleted
            });
        });
    },

    upload: (req, res) => {
        //Configurar modulo connect-multiparty router/experiencia.js

        //Recoger el fichero de la petición
        var file_name = 'imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //Conseguir nombre y extensión
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // * ADVERTENCIA * EN LINUX O MAC
        // var file_split = file_path.split('/');

        //Nombre del archivo
        var file_name = file_split[2];

        //Extensión del archivo
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1].toLowerCase();

        //Comprobar la extensión (sólo imagener)
        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            //borrar el fichero
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: "La extensión " + file_ext + " no es válida",

                });
            });
        } else {
            //Si todo es válido
            var jobId = req.params.id;
            //Buscar artículo asignado al nombre de la imagey actualizarlo

            Experiencia.findOneAndUpdate({ _id: jobId }, { logo: file_name }, { new: true }, (err, jobUpdated) => {
                if (err || !jobUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        message: "Error al subir la imagen"
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    experiencia: jobUpdated
                });
            });
            /* var jobId = req.params.id;
            Experiencia.findOneAndUpdate({ _id: jobId }, { logo: file_name }, { new: true }, (err, jobUpdated) => {
                if (err || !jobUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        message: "Error al subir la imagen"
                    });
                }

            }); */


        }

    },// end upload file

    getImage: (req, res) => {
        var file = req.params.logo;
        var path_file = './upload/experiencias/' + file;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                });
            }
        })
    },

    search: (req, res) => {
        //Sacar String a buscar
        var searchString = req.params.search;

        //find or
        Experiencia.find({
            "$or": [
                { "empresa": { "$regex": searchString, "$options": "i" } },
                { "puesto": { "$regex": searchString, "$options": "i" } }
            ]
        })
            .sort([['inicio', 'descending']])
            .exec((err, jobs) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición',
                    });
                }

                if (!jobs || jobs.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se ha encontrado nada',
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    jobs
                });
            })

    }
}; //end controller

module.exports = controller;