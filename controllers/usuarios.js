const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

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

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msj: "El correo ya esta registrado",
    });
  }

  //encriptar contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  await usuario.save();

  res.status(201).json({
    msg: "Post Api",
    usuario,
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
