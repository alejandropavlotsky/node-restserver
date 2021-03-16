const { response, request } = require('express');

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

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;
  res.json({
    msg: 'post API - Controlador',
    nombre,
    edad,
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
