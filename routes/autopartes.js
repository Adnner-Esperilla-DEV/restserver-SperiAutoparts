
const { Router } = require('express');
const { check } = require('express-validator');
const { crearAutoparte, EliminarAutoparte, actualizarAutoparte,  obtenerAutopartes, obtenerAutoparte, } = require('../controllers/autopartes');
const { existeAutopartePorId, existeTipoVehiculoPorId } = require('../helpers/db-validators');

const {validarCampos,validarJWT,esAdminRole,tieneRole} = require('../middlewares');


const router = Router();



router.get('/',obtenerAutopartes);
router.get('/',obtenerAutoparte);
// router.get('/:id',(req,res) =>{
//     res.json('get by id');
    
// });

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('tipoVehiculo','El tipo de Vehiculo es obligatorio').not().isEmpty(),
    check('tinpo','El tipo no es valido').isIn(
        ['PARTES_DE_CUERPO',
        'MOTOR_DEL_COCHE',
        'INTERIORES',
        'ILUMINACION_Y_LAMPARA',
        'PARTES_DE_REFACCION',
        'DISPOSITIVOS_INTELIGENTES',
        'RUEDAS_Y_NEUMAETICOS']),
    check('descripcion','La descripcion es obligatoria').not().isEmpty(),
    check('img','La imagen es obligatoria').not().isEmpty(),
   
    check('tipoVehiculo').custom(existeTipoVehiculoPorId),
 //    tieneTipoVehiculo,
    validarCampos
 ],crearAutoparte);

 router.put('/:id',[
    validarJWT,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeAutopartePorId),
   //  check('nombre','El nombre es obligatorio').not().isEmpty(),
   //  check('tipoVehiculo','El tipo de Vehiculo es obligatorio').not().isEmpty(),
   // check('tipo','El tipo no es valido').isIn(
   //      ['PARTES_DE_CUERPO',
   //      'MOTOR_DEL_COCHE',
   //      'INTERIORES',
   //      'ILUMINACION_Y_LAMPARA',
   //      'PARTES_DE_REFACCION',
   //      'DISPOSITIVOS_INTELIGENTES',
   //      'RUEDAS_Y_NEUMAETICOS']),
   //  check('descripcion','La descripcion es obligatoria').not().isEmpty(),
   //  check('img','La imagen es obligatoria').not().isEmpty(),
   
    check('tipoVehiculo').custom(existeTipoVehiculoPorId),
 //    tieneTipoVehiculo,
    validarCampos
 ],actualizarAutoparte);


 router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeAutopartePorId),
    validarCampos
],EliminarAutoparte)

module.exports = router;