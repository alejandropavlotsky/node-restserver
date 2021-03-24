const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await Usuario.find()
    .skip(Number(desde))
    .limit(Number(limite));
  res.json({ usuarios });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuarioDb = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuarioDb);
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

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
