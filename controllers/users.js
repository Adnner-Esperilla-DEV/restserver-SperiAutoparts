const { response } = require ('express');
 
const usersGet = (req, res = response) => {
    res.json({
        msg:'GET API - controlador'
    });
}
const usersPost = (req, res = response) => {
    const {nombre} =req.body;
    res.json({
        msg:'Post API - controladora',
        nombre
    });
}
const usersPut = (req, res = response) => {
    res.json({
        msg:'Put API - controlador'
    });
}
const usersPatch = (req, res = response) => {
    res.json({
        msg:'Patch API - controlador'
    });
}
const usersDelete = (req, res = response) => {
    res.json({
        msg:'Delete API - controlador'
    });
}
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}