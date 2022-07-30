const { response,request } = require ('express');

const bcryptjs = require ('bcryptjs');
const User= require('../models/user');


const usersGet = async(req=request, res = response) => {
    const { desde=0,limite=5} = req.query; 
    const query = {estado:true};


    const [total,usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios 
    });
}

const usersPost = async(req, res = response) => {
        
    const {nombre,correo,password,role} =req.body;
    const user = new User({nombre,correo,password,role});

    //Encriptacion
    const salt = bcryptjs.genSaltSync();
    user.password =bcryptjs.hashSync(password,salt);

    //Save
    await user.save();
    res.json(user);
}

const usersPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id,password,correo,...resto} = req.body;

    if(password){
    //Encriptacion
    const salt = bcryptjs.genSaltSync();
    resto.password =bcryptjs.hashSync(password,salt);
    }
    
    const user = await User.findByIdAndUpdate(id,resto, {new: true});
    
    res.json(user);
}

const usersPatch = (req, res = response) => {
    res.json({
        msg:'Patch API - controlador'
    });
}

const usersDelete = async(req, res = response) => {

    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id,{estado: false}, {new: true});
    res.json(user);
}
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}