const { response } = require("express");

const usuariosGet = (req, res = response) => {
  const query = req.query;
  res.json({
    msg: "Get Api - Controlador",
    query,
  });
};

const usuariosPut = (req, res) => {
  const { id } = req.params;
  res.status(201).json({
    msg: "Put Api",
    id,
  });
};

const usuariosPost = (req, res) => {
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: "Post Api",
    nombre,
    edad,
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    ok: true,
    msg: "Delete Api",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
