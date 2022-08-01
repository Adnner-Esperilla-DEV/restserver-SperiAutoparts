
const { Router } = require('express');
const { check } = require('express-validator');
const { model } = require('mongoose');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login );

module.exports =  router;