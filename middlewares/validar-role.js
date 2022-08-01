const { response, request } = require("express");

const esAdminRole = ( req=require,res = response,next) =>{

    if(!req.user){
        return res.status(500).json({
            msg:'Se requiere verificar el rol sin validar el token primero'
        });
    }
    const {role,nombre} = req.user;

    if (role!=='ADMIN_ROLE') {
        
        return res.status(401).json({
            msg:`${nombre} no es un administrador`
        });
    }   

    next();
}


 const tieneRole = (...roles) =>{
    return (req,res=response,next) =>{
        if(!req.user){
            return res.status(500).json({
                msg:'Se requiere verificar el rol sin validar el token primero'
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`El servicio requiere un de estos roles ${roles}`
            });
        }
        next();
    }
 }
module.exports = {
    esAdminRole,
    tieneRole

}