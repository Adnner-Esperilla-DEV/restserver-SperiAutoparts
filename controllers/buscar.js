const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {Autoparte, TipoVehiculo } = require('../models');
const coleccionesPermitidas = [
    'autoparte',
    'tipovehiculo',
    'autoparte-by-marca',
    'autoparte-by-modelo',
    'autoparte-by-tipo',
    'autoparte-by-todo'
    
];
//FALTA LAS BUSQUEDA CON ESPACIOS
const buscarAutoparteByTodo = async(termino ='',limite,desde,res=response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        const autoparte = await Autoparte.findById(termino);
        return res.json({
            results:(autoparte)?[autoparte]:[]
        })
    }

    const regex = new RegExp(termino,'i');
    const tipoVehiculo = await TipoVehiculo.find({ 
        $or:[{marca:regex},{modelo:regex},{tipo:regex}],
        $and:[{estado:true}]
    });
    const autoparte = await Autoparte.find({
        $or: [...tipoVehiculo.map( data => ({
            tipoVehiculo: data._id
        })),{nombre:regex},{tipo:regex},{descripcion:regex}],
        $and:[{estado:true}]
    }).populate('tipoVehiculo',['marca','modelo','tipo'])
      .skip(Number(desde))
      .limit(Number(limite)) 

    res.json({
        total:autoparte.length,
        results:(autoparte)?[autoparte]:[]
    })
}
const buscarAutopartes = async(termino ='',res=response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        const autoparte = await Autoparte.findById(termino);
        return res.json({
            results:(autoparte)?[autoparte]:[]
        })
    }

    const regex = new RegExp(termino,'i');
    const autoparte = await Autoparte.find({
        $or:[{nombre:regex},{tipo:regex}],
        $and:[{estado:true}]
    })
    res.json({
        results:(autoparte)?[autoparte]:[]
    })
}
const buscarTipoVehiculo = async(termino ='',res=response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        const tipoVehiculo = await TipoVehiculo.findById(termino);
        return res.json({
            results:(tipoVehiculo)?[tipoVehiculo]:[]
        })
    }

    const regex = new RegExp(termino,'i');
    const tipoVehiculo = await TipoVehiculo.find({
        $or:[{marca:regex},{modelo:regex}],
        $and:[{estado:true}]
    })
    res.json({
        results:(tipoVehiculo)?[tipoVehiculo]:[]
    })
}
const buscarAutoparteByMarca = async(termino ='',limite,desde,res=response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        const autoparte = await Autoparte.findById(termino);
        return res.json({
            results:(autoparte)?[autoparte]:[]
        })
    }

    const regex = new RegExp(termino,'i');
    const tipoVehiculo = await TipoVehiculo.find({ marca: regex, status: true});
    const autoparte = await Autoparte.find({
        $or: [...tipoVehiculo.map( data => ({
            tipoVehiculo: data._id
        }))],
        $and:[{estado:true}]
    }).populate('tipoVehiculo',['marca','modelo','tipo'])
      .skip(Number(desde))
      .limit(Number(limite)) 

    res.json({
        total:autoparte.length,
        results:(autoparte)?[autoparte]:[]
    })
}
const buscarAutoparteByModelo = async(termino ='',limite,desde,res=response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        const autoparte = await Autoparte.findById(termino);
        return res.json({
            results:(autoparte)?[autoparte]:[]
        })
    }

    const regex = new RegExp(termino,'i');
    const tipoVehiculo = await TipoVehiculo.find({ modelo: regex, status: true});
    const autoparte = await Autoparte.find({
        $or: [...tipoVehiculo.map( data => ({
            tipoVehiculo: data._id
        }))],
        $and:[{estado:true}]
    }).populate('tipoVehiculo',['marca','modelo','tipo'])
      .skip(Number(desde))
      .limit(Number(limite)) 

    res.json({
        total:autoparte.length,
        results:(autoparte)?[autoparte]:[]
    })
}
const buscarAutoparteByTipo = async(termino ='',limite,desde,res=response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if ( esMongoID ) {
        const autoparte = await Autoparte.findById(termino);
        return res.json({
            results:(autoparte)?[autoparte]:[]
        })
    }

    const regex = new RegExp(termino,'i');
    const autoparte = await Autoparte.find({
        $or:[{tipo:regex},{tipo:regex}],
        $and:[{estado:true}]
    }).populate('tipoVehiculo',['marca','modelo','tipo'])
      .skip(Number(desde))
      .limit(Number(limite)) 
    res.json({
        total:autoparte.length,
        results:(autoparte)?[autoparte]:[]
    })
}
const buscar = (req,res=response) =>{

    const {coleccion,termino}=req.params;
    const {limite = 5 ,desde = 0}=req.query;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg :`Las colecciones permitidas son : ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'autoparte':
            buscarAutopartes(termino,res)
            break;
        case 'tipovehiculo':
            buscarTipoVehiculo(termino,res)
            break;
        case 'autoparte-by-marca':
            buscarAutoparteByMarca(termino,limite,desde,res)
             break;
        case 'autoparte-by-modelo':
            buscarAutoparteByModelo(termino,limite,desde,res)
             break;
        case 'autoparte-by-tipo':
            buscarAutoparteByTipo(termino,limite,desde,res)
             break;
        case 'autoparte-by-todo':
            buscarAutoparteByTodo(termino,limite,desde,res)
             break;       
        default:
           res.status(500).json({
            msg:'Implementar nueva busqueda'
           })
    }
    
    // res.json({
        
    //     coleccion,termino
    // })
}

module.exports = {
    buscar
}