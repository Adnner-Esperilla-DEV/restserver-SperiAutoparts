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
                msg:'Usuario/Password no son correctos',
            }) 
        }
        //Verificar estado
        if(!user.estado){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos',
            }) 
        }
        //Verificar passsword
        const valiPassword = bcryptjs.compareSync(password,user.password);
        if(!valiPassword){
            return res.status(400).json({
                msg:'Usuario/Password no son correctos',
            }) 
        }

        //Genera JWT
        const token = await generarJWT(user.id);
        res.json({
            user,
            token
            
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el admin',
        })
    }
    
}

module.exports = {
    login
}