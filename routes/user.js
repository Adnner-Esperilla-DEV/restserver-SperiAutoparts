
const { Router } = require('express');
const { check } = require('express-validator');

// const {validarCampos} = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-role');
const {validarCampos,validarJWT,esAdminRole,tieneRole} = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');



const router = Router();

router.get('/', usersGet );
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es debe ser mas de 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('role','El role no es valido').isIn(['ADMIN_ROLE','USERNAME']),
    check('role').custom(esRoleValido),
    validarCampos
], usersPost );
router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], usersPut );
router.patch('/', usersPatch );
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    // tieneRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usersDelete );
module.exports = router;