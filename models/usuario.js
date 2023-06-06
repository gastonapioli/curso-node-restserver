const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "nombre es requerido"],
  },
  correo: {
    type: String,
    required: [true, "correo es requerido"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "contraseña es requerido"],
  },
  imagen: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "contraseña es requerido"],
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
  ESTADO: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Usuario", UsuarioSchema);
