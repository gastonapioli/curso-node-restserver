const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    //Conectar a BDD
    this.conectarDB();
    //Midlewares
    this.middlewares();
    //Rutas de mi App

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //cors
    this.app.use(cors());

    //parseo y lectura del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public")); //los middlewares tienen la func use
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.authPath, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("PROCESO CORRIENDO", this.port);
    });
  }
}
module.exports = Server;
