const {Schema,model} = require('mongoose');

const autoparteSchema = Schema({

    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    tipo:{
        type:String,
        required:[true,'El tipo es obligatorio'],
        emun:['PARTES_DE_CUERPO',
        'MOTOR_DEL_COCHE',
        'INTERIORES',
        'ILUMINACION_Y_LAMPARA',
        'PARTES_DE_REFACCION',
        'DISPOSITIVOS_INTELIGENTES',
        'RUEDAS_Y_NEUMAETICOS']
    },
    descripcion:{
        type:String,
        required:[true,'La descripcion es obligatoria']
    },
    cantidad:{
        type:Number,
        default:0,
        
    },
    precio:{
        type:Number,
        default:0,
    },
    img:{
        type:String,
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    tipoVehiculo:{
        type:Schema.Types.ObjectId,
        ref:'TipoVehiculo',
        required:[true,'El id de  tipo de vehiculo es Obligatorio']
    },
    

});

autoparteSchema.methods.toJSON = function(){

    const { __v,_id,... resto} = this.toObject();
    resto.uid=_id;
    return resto;
}
module.exports= model('Autoparte',autoparteSchema); 