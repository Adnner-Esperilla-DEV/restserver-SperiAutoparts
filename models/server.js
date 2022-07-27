const express = require('express')
const cors = require('cors')
class Server {

    constructor(){
        this.app = express();
        this.port =process.env.PORT;
        this.userPath = '/api/users';
        //Middlware
        this.middlewares();

        this.routes();
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
        this.app.use(this.userPath,require('../routes/user'));
    }
    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto',this.port);
        });
    }
}

module.exports = Server;