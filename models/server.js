const express = require('express');
const cors = require('cors');
const {dbConnection} =require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port =process.env.PORT;
        this.userPath = '/api/users';
        this.authPath='/api/auth';
        //Coneccion a DB
        this.conectarDB();

        //Middlware
        this.middlewares();

        this.routes();
    }
    
    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //lectura y parse de body
        this.app.use(express.json());
        //directorio publico    
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.userPath,require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}

module.exports = Server;