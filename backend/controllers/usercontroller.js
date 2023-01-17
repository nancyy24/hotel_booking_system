const usermodel = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


module.exports.signUp = async (request,response)=>
{
    let data = request.body;
    try{
    // creating instance
    let salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(data.password,salt);
    let newUser = new usermodel ({
        given_name :data.given_name,
        email:data.email,
        password:newPassword,
        mobile:data.mobile
    });

    // save method
    let result = await newUser.save()
    response.status(200).send({
        status:true,
        result
    });
}

catch(error){
    response.status(200).send({
        status:false,
        error
    })
}
}


module.exports.login = async (request,response)=>
{   let data = request.body;
    try{
         let result = await usermodel.findOne({ //usimg findone
                email:data.email
            });
 

        if(result==null)
        {
            response.status(200).send({
                status:false,
                message:" username invalid"
            });}

        else {
            let isValid = await bcrypt.compare(data.password,result.password);
            if(isValid){
                const token = jwt.sign({email:result.email,given_name:result.given_name,mobile:result.mobile,_id: result._id,isAdmin:result.isAdmin},"mynameisnancyguptaworkingonhotelmanagementsystem")
                response.status(200).send({
                    status:true,
                    message:"login successfully",
                    result,
                    token
                });
            }
            else{
                response.status(200).send({
                    status:false,
                    message:"invalid password"  });
            }          
            }

}
catch(error){
    response.status(500).send({
        status:false,
        error
    })
}
}


module.exports.getallusers = async(request,response)=>{
    try{
        let result = await usermodel.find({})
        response.status(200).send({
            status:true,
            result
        });
    }
    catch(error){
        response.status(500).send({status:false,
            error,
        message:"server error"});
    }
}
