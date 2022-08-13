const express = require('express');
const cors = require('cors');
const {dbConnection} =require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port =process.env.PORT;
        this.paths={
            auth:'/api/auth',
            autopartes:'/api/autopartes',
            buscar:'/api/buscar',
            imgAutopartes:'/api/imgAutopartes',
            tipoVehiculos:'/api/tipoVehiculos',
            user:'/api/users',
            
        }
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
        this.app.use(this.paths.auth,require('../routes/auth'));
        this.app.use(this.paths.autopartes,require('../routes/autopartes'));
        this.app.use(this.paths.buscar,require('../routes/buscar'));
        this.app.use(this.paths.imgAutopartes,require('../routes/imgAutopartes'));
        this.app.use(this.paths.tipoVehiculos,require('../routes/tipoVehiculos'));
        this.app.use(this.paths.user,require('../routes/user'));
        
    }
    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}

module.exports = Server;