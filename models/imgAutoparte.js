const {Schema,model} = require('mongoose');

const imgAutoparteSchema = Schema({

    img:{
        type:String,
        required:[true,'La imagen es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    autoparte:{
        type:Schema.Types.ObjectId,
        ref:'Autoparte',
        required:[true,'El id de  autoparte es Obligatorio']
    },
    
});




module.exports= model('ImgAutoparte',imgAutoparteSchema); 