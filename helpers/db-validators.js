const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta en la bdd`);
  }
};

//verificar si el correo existe
const esEmailValido = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};
const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findOne({ id });
  if (!existeUsuario) {
    throw new Error(`El usuario con id  ${id} no existe`);
  }
};

module.exports = {
  esRolValido,
  esEmailValido,
  existeUsuarioPorId,
};
