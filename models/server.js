const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = '/api/users';

    // Midelware
    this.middlewares();
    // Rutas
    this.routes();
  }

  middlewares() {
    // cors
    this.app.use(cors());

    // parseo y lectura del body
    this.app.use(express.json());

    //   Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersRoutePath, require('../routes/user'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
