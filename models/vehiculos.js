const {Schema,model} = require('mongoose');

const VehiculoSchema = Schema({

    serie:{
        type:String,
        required:[true,'La marca es obligatoria']
    },
    year:{
        type:String,
        required:[true,'El modelo es obligatorio']
    },
    motor:{
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




module.exports= model('Vehiculo',VehiculoSchema); 