const {Schema,model} = require('mongoose');

const tipoVehiculoSchema = Schema({

    marca:{
        type:String,
        required:[true,'La marca es obligatoria']
    },
    modelo:{
        type:String,
        required:[true,'El modelo es obligatorio']
    },
    tipo:{
        type:String,
        required:[true,'El tipo es obligatorio'],
        emun:['SEDAN','HATCHBACK','DEPORTIVO','SUV','PICK-UP',
            'VANS','STATION','MOTO','BUSES','MAQUINARIA']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
});



tipoVehiculoSchema.methods.toJSON = function(){

    const { __v,_id,... resto} = this.toObject();
    resto.uid=_id;
    // var marca = resto.marca.toLowerCase();
    // var modelo = resto.marca.toLowerCase();
    // resto.marca = marca.charAt(0).toUpperCase() + marca.slice(1)
 
    return resto;
}


module.exports= model('TipoVehiculo',tipoVehiculoSchema); 
