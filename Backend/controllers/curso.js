'use strict'

var validator = require('validator');
var Curso = require('../models/curso');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/curso');

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
            message: "Soy la acción Test de mi controlador de los cursos"
        });
    },
    save: (req, res) => {
        //recoger parámetros por post
        var params = req.body;

        // validar datos (validator)
        try {
            var validate_fecha = !validator.isEmpty(params.inicio);
            var validate_centro = !validator.isEmpty(params.centro);
            var validate_nombre = !validator.isEmpty(params.nombre);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_fecha && validate_centro && validate_nombre) {

            //crear objeto a guardar
            var curso = new Curso();

            //Asignar valores
            curso.fecha = params.fecha;
            curso.duracion = params.duracion;
            curso.centro = params.centro;
            curso.nombre = params.nombre;
            curso.imagen = params.imagen;

            //guardar curso
            curso.save((err, cursoStored) => {
                if (err || !cursoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: "El curso no se ha guardado"
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    curso: cursoStored
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

        var query = Curso.find();
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }
        //find
        query.sort('_id').exec((err, cursos) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "No se han podido obtener los datos"
                });
            } else if (!cursos) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay cursos para mostrar"
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    cursos
                });
            }

        });

    },

    getJob: (req, res) => {

        //recoger id de la url
        var cursoId = req.params.id;

        //Comprobar que existe
        if (!cursoId || cursoId == null) {
            return res.status(404).send({
                status: 'error',
                message: "No existe el trabajo selecionado"
            });
        }
        //Buscar el artículo
        curso.findById(cursoId, (err, curso) => {
            if (err || !curso) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el trabajo solicitado"
                });
            }
            //Devolver el resultado
            return res.status(404).send({
                status: 'success',
                curso
            });
        });

    },

    update: (req, res) => {
        //Recoger el ID del artículo por la url
        var cursoId = req.params.id;

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
            curso.findByIdAndUpdate({ _id: cursoId }, params, { new: true }, (err, cursoUpdated) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: "Error al actualizar"
                    });
                }

                if (!cursoUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No existe el artículo"
                    });
                }

                return res.status(404).send({
                    status: 'success',
                    curso: cursoUpdated
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
        var cursoId = req.params.id;
        // Find and delete
        curso.findOneAndDelete({ _id: cursoId }, (err, cursoDeleted) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: "Error al borrar"
                });
            }

            if (!cursoDeleted) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el trabajo a borrar"
                });
            }

            return res.status(404).send({
                status: 'success',
                curso: cursoDeleted
            });
        });
    },

    upload: (req, res) => {
        //Configurar modulo connect-multiparty router/curso.js

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
            var cursoId = req.params.id;
            //Buscar artículo asignado al nombre de la imagey actualizarlo

            curso.findOneAndUpdate({ _id: cursoId }, { logo: file_name }, { new: true }, (err, cursoUpdated) => {
                if (err || !cursoUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        message: "Error al subir la imagen"
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    curso: cursoUpdated
                });
            });
            /* var cursoId = req.params.id;
            curso.findOneAndUpdate({ _id: cursoId }, { logo: file_name }, { new: true }, (err, cursoUpdated) => {
            	if (err || !cursoUpdated) {
            		return res.status(200).send({
            			status: 'error',
            			message: "Error al subir la imagen"
            		});
            	}

            }); */


        }

    }, // end upload file

    getCert: (req, res) => {
        var file = req.params.imagen;
        var path_file = './upload/cursos/' + file;
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
        curso.find({
                "$or": [
                    { "empresa": { "$regex": searchString, "$options": "i" } },
                    { "puesto": { "$regex": searchString, "$options": "i" } }
                ]
            })
            .sort([
                ['inicio', 'descending']
            ])
            .exec((err, cursos) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición',
                    });
                }

                if (!cursos || cursos.length <= 0) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No se ha encontrado nada',
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    cursos
                });
            })

    }
}; //end controller

module.exports = controller;