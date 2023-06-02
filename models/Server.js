const express = require("express");
var cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //Midlewares
    this.middlewares();
    //Rutas de mi App

    this.routes();
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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("PROCESO CORRIENDO", this.port);
    });
  }
}
module.exports = Server;
