const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = 'No name', apiKey, page = 1, limit } = req.query;
  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    apiKey,
    page,
    limit,
  });
};

const usuariosPut = (req, res) => {
  const id = req.params.id;
  res.json({
    msg: 'put API - Controlador',
    id,
  });
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: 'El correo ya existe',
    });
  }

  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: 'patch API - Controller',
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: 'delete API - Controller',
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
