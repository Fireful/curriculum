'use strict'

var validator = require('validator');
var Formacion = require('../models/formacion');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/formacion');

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
    save: (req, res) => {
        //recoger parámetros por post
        var params = req.body;

        // validar datos (validator)
        try {
            var validate_start = !validator.isEmpty(params.inicio);
            var validate_end = !validator.isEmpty(params.fin);
            var validate_centro = !validator.isEmpty(params.centro);
            var validate_titulacion = !validator.isEmpty(params.titulacion);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_start && validate_end && validate_centro && validate_titulacion) {

            //crear objeto a guardar
            var formacion = new Formacion();

            //Asignar valores
            formacion.inicio = params.inicio;
            formacion.fin = params.fin;
            formacion.empresa = params.centro;
            formacion.puesto = params.titulacion;

            //guardar experiencia
            formacion.save((err, formacionStored) => {
                if (err || !formacionStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: "La formación no se ha guardado"
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    formacion: formacionStored
                });
            })
        } else {
            return res.status(200).send({
                status: 'error',
                message: "Los datos no son válidos"
            });
        }
    },

    getFormaciones: (req, res) => {

        var query = Formacion.find();
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }
        //find
        query.sort('_id').exec((err, formaciones) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "No se han podido obtener los datos"
                });
            } else if (!formaciones) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay formaciones para mostrar"
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    formaciones
                });
            }

        });

    },

    getFormacion: (req, res) => {

        //recoger id de la url
        var formacionId = req.params._id;

        //Comprobar que existe
        if (!formacionId || formacionId == null) {
            return res.status(404).send({
                status: 'error',
                message: "No existe la formación selecionada"
            });
        }
        //Buscar el artículo
        Formacion.findById(formacionId, (err, formacion) => {
            if (err || !formacion) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe la formación solicitada"
                });
            }
            //Devolver el resultado
            return res.status(404).send({
                status: 'success',
                formacion
            });
        });

    },

    update: (req, res) => {
        //Recoger el ID del artículo por la url
        var formacionId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;
        //Validar los datos
        try {
            var validate_start = !validator.isEmpty(params.inicio);
            var validate_end = !validator.isEmpty(params.fin);
            var validate_centro = !validator.isEmpty(params.centro);
            var validate_titulacion = !validator.isEmpty(params.titulacion);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_start && validate_end && validate_centro && validate_titulacion) {
            //Find and update
            Formacion.findByIdAndUpdate({ _id: formacionId }, params, { new: true }, (err, formacionUpdated) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: "Error al actualizar"
                    });
                }

                if (!formacionUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No existe la formación"
                    });
                }

                return res.status(404).send({
                    status: 'success',
                    formacion: formacionUpdated
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
        var formacionId = req.params.id;
        // Find and delete
        Formacion.findOneAndDelete({ _id: formacionId }, (err, formacionDeleted) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: "Error al borrar"
                });
            }

            if (!formacionDeleted) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe la formación a borrar"
                });
            }

            return res.status(404).send({
                status: 'success',
                formacion: formacionDeleted
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
            var formacionId = req.params.id;
            //Buscar artículo asignado al nombre de la imagey actualizarlo

            Formacion.findOneAndUpdate({ _id: formacionId }, { logo: file_name }, { new: true }, (err, formacionUpdated) => {
                if (err || !formacionUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        message: "Error al subir la imagen"
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    experiencia: formacionUpdated
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

    }, // end upload file

    getImage: (req, res) => {
        var file = req.params.logo;
        var path_file = './upload/formaciones/' + file;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file))
            } else {
                return res.status(404).send({
                    status: 'error',
                    path_file
                });
            }
        })
    },



    search: (req, res) => {
        //Sacar String a buscar
        var searchString = req.params.search;

        //find or
        Formacion.find({
                "$or": [
                    { "centro": { "$regex": searchString, "$options": "i" } },
                    { "titulacion": { "$regex": searchString, "$options": "i" } }
                ]
            })
            .sort([
                ['inicio', 'descending']
            ])
            .exec((err, formaciones) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición',
                    });
                }

                if (!formaciones || formaciones.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se ha encontrado nada',
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    formaciones
                });
            })

    }
}; //end controller

module.exports = controller;