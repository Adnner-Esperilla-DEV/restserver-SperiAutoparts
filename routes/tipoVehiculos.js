
const { Router } = require('express');
const { check } = require('express-validator');
const { crearTipoVehiculo ,
    obtenerTipoVehiculos,
    obtenerTipoVehiculo, 
    actualizarTipoVehiculo,
    EliminarTipoVehiculo} = require('../controllers/tipoVehiculos');
const { existeTipoVehiculoPorId, existeModeloTipoVehiculo } = require('../helpers/db-validators');

const {validarCampos,validarJWT,esAdminRole,tieneRole,tieneTipoVehiculo} = require('../middlewares');


const router = Router();

router.get('/',obtenerTipoVehiculos);

router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),       
    check('id').custom(existeTipoVehiculoPorId),
    validarCampos,
],obtenerTipoVehiculo);

router.post('/',[
   validarJWT,
   check('marca','La marca es obligatorio').not().isEmpty(),
   check('modelo','El modelo es obligatorio').not().isEmpty(),
   check('tipo','El tipo no es valido').isIn(['SEDAN','HATCHBACK','DEPORTIVO','SUV','PICK-UP',
   'VANS','STATION','MOTO','BUSES','MAQUINARIA']),
   check('modelo').custom(existeModeloTipoVehiculo),
//    tieneTipoVehiculo,
   validarCampos
],crearTipoVehiculo);

router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(),
    check('marca','La marca es obligatorio').not().isEmpty(),
    check('modelo','El modelo es obligatorio').not().isEmpty(),
    check('tipo','El tipo no es valido').isIn(['SEDAN','HATCHBACK','DEPORTIVO','SUV','PICK-UP',
   'VANS','STATION','MOTO','BUSES','MAQUINARIA']),
    check('id').custom(existeTipoVehiculoPorId),
    validarCampos
],actualizarTipoVehiculo)

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeTipoVehiculoPorId),
    validarCampos
],EliminarTipoVehiculo)
module.exports = router;