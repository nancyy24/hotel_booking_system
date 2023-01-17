const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    given_name : {
        type:String,
        required : true
    },
    email : {
        type:String,
        required : true
    },
    mobile : {
        type:Number,
        required : true
    },
    password : {
        type:String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

const usermodel = mongoose.model("users",userSchema)

module.exports = usermodel