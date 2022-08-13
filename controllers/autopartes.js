const { response,request  } = require("express");
const {Autoparte } = require('../models');


const obtenerAutopartes = async(req,res = response) => {
    const {limite = 5 ,desde = 0,estado=1}=req.query;
    var data=true;
    if(estado==1 ){
        data=true;
    }
    else if(estado == 0){
        data=false;
        
    }else{
        return res.status(500).json({
            msg:`El parametro estado=${estado} es incorrecto`
        });
    }
    
    const query = {estado :data};

    const [total,autoparte] = await Promise.all([
        Autoparte.countDocuments(query),
        Autoparte.find(query)
            .populate('tipoVehiculo',['marca','modelo','tipo']) 
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        autoparte
    });
}

const obtenerAutoparte = async(req,res = response) => {
    
    const {id} = req.params;
    const autoparte = await Autoparte.findById(id)
                                     .populate('tipoVehiculo',['marca','modelo','tipo']) ;
    res.status(200).json(autoparte);
}

const crearAutoparte = async(req,res=response) =>{

    // const {nombre,tipo,password,role} =req.body;
    const autoparte = new Autoparte(req.body);
    //Save
    await autoparte.save();
    res.status(201).json(autoparte);


}
const actualizarAutoparte = async(req,res = response)=>{

    const {id} = req.params;
    const {...data} = req.body;  
    const autoparte = await Autoparte.findByIdAndUpdate(id,data,{new : true });


    res.status(200).json(autoparte);
}
const EliminarAutoparte = async(req,res = response)=>{

    const {id} = req.params;    
    const autoparte = await Autoparte.findByIdAndUpdate(id,{ estado:false },{new : true });
    

    res.status(200).json(autoparte);
}

module.exports = {
    crearAutoparte,
    obtenerAutopartes,
    obtenerAutoparte,
    actualizarAutoparte,
    EliminarAutoparte
}