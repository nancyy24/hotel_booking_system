const express = require("express")
// const { v4: uuidv4} = require("uuid")
// const stripe = require("stripe")("sk_test_51MPNrzSJWOfmpb77eZM2q8kurMvmF8MGTpDqiSSFGM1NFQ2Agnhqg9AXjL9DoU7CgyqXtx7MjhEenR4HzV3WO54N00QPN9XiVr")

const bookedroommodel = require("../modals/bookedroom")
const roomModal = require("../modals/room")

module.exports.bookroom = async (request,response) => {

    const data = request.body
    try{
        const newbooking = new bookedroommodel({
            room : data.room.name,
            roomid : data.room._id,
            userid : data.userid,
            fromdate : data.fromdate,
            todate : data.todate,
            totalamount : data.totalamount,
            totaldays : data.totaldays,
            transactionId : "1234"


        })
        let result = await newbooking.save()
        response.status(200).send({
            status:true,
            result
    });
    // const todate = date
        const findroom = await roomModal.findOne({ _id :data.room._id})
        // response.status(200).send(findroom)
        findroom.totalbookings.push({
            bookingid : newbooking._id,
            fromdate : data.fromdate,
            todate : data.todate,
            userid : data.userid,
            status : newbooking.status

        })
        // response.status(200).send(findroom)


        await findroom.save()

        
    }
    catch(error)
    {
        response.status(200).send({
            status:false,
            error
        })
    }

}


module.exports.bookedroombyId = async (request,response) =>{
    const data = request.body
    try{
        let result = await bookedroommodel.find({  userid : data.id })

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
    catch(error)
    {
        response.status(200).send({
            status:false,
            error
        })
    }
}

module.exports.cancelrooms = async(request,response) =>{
    let data = request.body;
    try{
        const bookingitem = await bookedroommodel.findOne({_id : data.bookingid})
        bookingitem.status = "Cancelled"
        await bookingitem.save()

        const roomitem = await roomModal.findOne({_id : data.roomid})
        
        const tempbookings = roomitem.totalbookings

        const temp = tempbookings.filter((bookingroom) =>{
            bookingroom.bookingid !== data.bookingid
        })

        roomitem.totalbookings = temp
        await roomitem.save()

        response.status(200).send({
            status:true,
            message:"Cancelled succesfully"
    });
    }
    catch(error)
    {
        response.status(200).send({
            status:false,
            error
        })
    }
}

module.exports.getallbookings = async (request,response) =>{
    try{
        let result = await bookedroommodel.find()
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
    // try{

    //      const customer = await stripe.customers.create({
    //         email : data.token.email,
    //         source : data.token.id
    //      })

    //     const payment = await stripe.charges.create({
    //         amount : (data.totalamount) * 100,
    //         customer : customer.id,
    //         currency : "inr",
    //         receipt_email : data.token.email

    //     },{
    //         idempotencyKey : uuidv4()
    //     });

    //     if(payment)
    //     {
    //         const newbooking = new bookedroommodel({
    //             room : data.room.name,
    //             roomid : data.room._id,
    //             userid : data.userid,
    //             fromdate : data.fromdate,
    //             todate : data.todate,
    //             totalamount : data.totalamount,
    //             totaldays : data.totaldays,
    //             transactionId : "1234"
    
    
    //         })
    //         let result = await newbooking.save()
    //     //     response.status(200).send({
    //     //         status:true,
    //     //         result
    //     // });
    //     // const todate = date
    //         const findroom = await roomModal.findOne({ _id :data.room._id})
    //         // response.status(200).send(findroom)
    //         findroom.totalbookings.push({
    //             bookingid : newbooking._id,
    //             fromdate : data.fromdate,
    //             todate : data.todate,
    //             userid : data.userid,
    //             status : newbooking.status
    
    //         })
    //         // response.status(200).send(findroom)
    
    
    //         await findroom.save()
    
    //     }

    //     // response.status(200).send({
    //     //     message:"roome booked successfully"
    //     // })
    //  }
    // catch(error)
    // {
    //     response.status(200).send({
    //         status:false,
    //         error
    //     })
    // }


  