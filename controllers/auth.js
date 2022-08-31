const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generarJWT } = require("../helpers/generar-jwt");

const login = async(req,res=response) => {

    const { correo,password } = req.body;

    try {
        //Verificar si existe user
        const user = await User.findOne({correo});
        if(!user){
            return res.status(400).json({
                ok:false,
                msg:'Usuario/Password no son correctos',
            }) 
        }
        //Verificar estado
        if(!user.estado){
            return res.status(400).json({
                ok:false,
                msg:'Usuario/Password no son correctos',
            }) 
        }
        //Verificar passsword
        const valiPassword = bcryptjs.compareSync(password,user.password);
        if(!valiPassword){
            return res.status(400).json({
                ok:false,
                msg:'Usuario/Password no son correctos',
            }) 
        }

        //Genera JWT
        const token = await generarJWT(user.id);
        res.json({
            ok:true,
            user,
            token
            
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el admin',
        })
    }
    
}
const revalidarToken = async(req, res = response ) => {

    const {  nombre ,_id} = req.user;
    const uid = _id;
    // Generar el JWT
    const token = await generarJWT( uid, nombre );
    return res.json({
        ok: true,
        uid, 
        nombre,
        token
    });

}
module.exports = {
    login,
    revalidarToken
}