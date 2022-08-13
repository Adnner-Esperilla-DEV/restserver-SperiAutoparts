const {Schema,model} = require('mongoose');

const UserSchema = Schema({

    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El password es obligatorio']
    },
    role:{
        type:String,
        required:[true,'El rol es obligatorio'],
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },

});

UserSchema.methods.toJSON = function(){

    const { __v,password,_id,... user} = this.toObject();
    user.uid=_id;
    return user;
}


module.exports= model('User',UserSchema); 