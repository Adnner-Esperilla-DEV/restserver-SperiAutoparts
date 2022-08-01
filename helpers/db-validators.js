const Role = require('../models/role');
const User= require('../models/user');

const esRoleValido =async(role='')=>{
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error(`El rol ${role} no esta en la DB` );
    }
}
const emailExiste = async(correo ='') =>{
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`Este correo: ${correo} ,ya esta registrado` );
    }
}
const existeUsuarioPorId = async(id ) =>{
    const existeUser = await User.findById(id);
    if(!existeUser){
        throw new Error(`Este id: ${id} ,no existe` );
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}