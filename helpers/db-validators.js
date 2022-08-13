
const {Role,TipoVehiculo,User,Autoparte}= require('../models');



//VALIDATOR-----ROLES
const esRoleValido =async(role='')=>{
    const existeRole = await Role.findOne({role});
    if (!existeRole) {
        throw new Error(`El rol ${role} no esta en la DB` );
    }
}
//VALIDATOR----EMAIL
const emailExiste = async(correo ='') =>{
    const existeEmail = await User.findOne({correo});
    if(existeEmail){
        throw new Error(`Este correo: ${correo} ,ya esta registrado` );
    }
}
//VALIDATOR-----USER
const existeUsuarioPorId = async(id ) =>{
    const existeUser = await User.findById(id);
    if(!existeUser){
        throw new Error(`Este id: ${id} ,no existe` );
    }
}
//VALIDATOR-----TIPO VEHICULO
const existeTipoVehiculoPorId = async(id)=>{

    const existeTipoVehiculo=await TipoVehiculo.findById(id);
    if(!existeTipoVehiculo){
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeModeloTipoVehiculo = async(modelo='')=>{  
    const model = modelo.toUpperCase();
    const existeTipoVehiculo = await TipoVehiculo.findOne({'modelo':model});
    // console.log(`el modelo es ${model} ${existeTipoVehiculo}`)
    if(existeTipoVehiculo){
        throw new Error(`El modelo: ${model} ,ya esta registrado`);
    }
}
//VALIDATOR-----TIPO VEHICULO
const existeAutopartePorId = async(id)=>{
    //Verficiar si el correo existe
    const existeAutoparte=await Autoparte.findById(id);
    if(!existeAutoparte){
        throw new Error(`El id: ${id} no existe`);
    }
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeTipoVehiculoPorId,
    existeModeloTipoVehiculo,
    existeAutopartePorId
}