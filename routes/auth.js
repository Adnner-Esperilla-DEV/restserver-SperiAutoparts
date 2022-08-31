
const { Router } = require('express');
const { check } = require('express-validator');
const { model } = require('mongoose');
const { login, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares');
const router = Router();

router.post('/login',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login );
router.get( '/renew', validarJWT , revalidarToken );
module.exports =  router;