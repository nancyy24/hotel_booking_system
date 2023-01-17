const express = require("express")

const roomModal = require("../modals/room.js")

module.exports.get_all_room = async (request,response) =>{
try{
    let result = await roomModal.find({})
    response.status(200).send({
        status:true,
        result
    });
}
catch(error){
    response.status(500).send({status:false,
        error,
    message:"server error,contact to admin"});
}
}


module.exports.getRoomDetailsById = async (request,response)=>{
    try{
    let room_id =request.params.id;
    let result = await roomModal.findOne({_id:room_id})
    if(result){
    response.status(200).send({
        status:true,
        result
    });

    }
    else{
        response.status(200).send({
            status:false,
            message:"no such restaurant"
        })
    }
}
    catch(error){
            response.status(500).send({status:false,
            error,
        message:"server error,contact to admin"});
};
};

module.exports.addroomhotel = async(request,response)=>{

    try{
        const newroom = new roomModal(request.body)
        await newroom.save()
        response.send({
            status:true,
            message:"Room Added Succussfully"
        })

    }
    catch(error)
    { response.status(500).send({status:false,
        error,
    message:"server error,contact to admin"});

    }
}
