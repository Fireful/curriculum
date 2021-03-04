'use strict'

var validator = require('validator');
var Conocimiento = require('../models/conocimiento');
var fs = require('fs');
var path = require('path');
const { exists } = require('../models/conocimiento');

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
            message: "Soy la acción Test de mi controlador de los conocimientos"
        });
    },
    save: (req, res) => {
        //recoger parámetros por post
        var params = req.body;

        // validar datos (validator)
        try {
            var validate_concepto = !validator.isEmpty(params.concepto);
            var validate_nivel = !validator.isEmpty(params.nivel);

        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_concepto && validate_nivel) {

            //crear objeto a guardar
            var conocimiento = new Conocimiento();

            //Asignar valores
            conocimiento.concepto = params.concepto;
            conocimiento.nivel = params.nivel;


            //guardar curso
            conocimiento.save((err, conocimientoStored) => {
                if (err || !conocimientoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: "El conocimiento no se ha guardado"
                    });
                }
                //Devolver respuesta
                return res.status(200).send({
                    status: 'success',
                    curso: conocimientoStored
                });
            })
        } else {
            return res.status(200).send({
                status: 'error',
                message: "Los datos no son válidos"
            });
        }
    },

    getConocimientos: (req, res) => {

        var query = Conocimiento.find();
        var last = req.params.last;

        if (last || last != undefined) {
            query.limit(5);
        }
        //find
        query.sort('_id').exec((err, conocimientos) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "No se han podido obtener los datos"
                });
            } else if (!conocimientos) {
                return res.status(404).send({
                    status: 'error',
                    message: "No hay conocimientos para mostrar"
                });
            } else {
                return res.status(200).send({
                    status: 'success',
                    conocimientos
                });
            }

        });

    },

    getConocimiento: (req, res) => {

        //recoger id de la url
        var conocimientoId = req.params.id;

        //Comprobar que existe
        if (!conocimientoId || conocimientoId == null) {
            return res.status(404).send({
                status: 'error',
                message: "No existe el conocimiento selecionado"
            });
        }
        //Buscar el artículo
        conocimiento.findById(conocimientoId, (err, conocimiento) => {
            if (err || !conocimiento) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el conocimiento solicitado"
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
        var conocimientoId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;
        //Validar los datos
        try {
            var validate_concepto = !validator.isEmpty(params.concepto);
            var validate_nivel = !validator.isEmpty(params.nivel);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: "Faltan datos por enviar"
            });
        }
        if (validate_concepto && validate_nivel) {
            //Find and update
            conocimiento.findByIdAndUpdate({ _id: conocimientoId }, params, { new: true }, (err, conocimientoUpdated) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: "Error al actualizar"
                    });
                }

                if (!conocimientoUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: "No existe el concepto"
                    });
                }

                return res.status(404).send({
                    status: 'success',
                    curso: conocimientoUpdated
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
        var conocimientoId = req.params.id;
        // Find and delete
        curso.findOneAndDelete({ _id: conocimientoId }, (err, cursoDeleted) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: "Error al borrar"
                });
            }

            if (!conocimientoDeleted) {
                return res.status(404).send({
                    status: 'error',
                    message: "No existe el trabajo a borrar"
                });
            }

            return res.status(404).send({
                status: 'success',
                curso: conocimientoDeleted
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
            var conocimientoId = req.params.id;
            //Buscar artículo asignado al nombre de la imagey actualizarlo

            conocimiento.findOneAndUpdate({ _id: conocimientoId }, { logo: file_name }, { new: true }, (err, conocimientoUpdated) => {
                if (err || !conocimientoUpdated) {
                    return res.status(200).send({
                        status: 'error',
                        message: "Error al subir la imagen"
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    curso: conocimientoUpdated
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

    /* getCert: (req, res) => {
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
    }, */

    search: (req, res) => {
        //Sacar String a buscar
        var searchString = req.params.search;

        //find or
        conocimiento.find({
                "$or": [
                    { "empresa": { "$regex": searchString, "$options": "i" } },
                    { "puesto": { "$regex": searchString, "$options": "i" } }
                ]
            })
            .sort([
                ['inicio', 'descending']
            ])
            .exec((err, conocimientos) => {

                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición',
                    });
                }

                if (!conocimientos || conocimientos.length <= 0) {
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