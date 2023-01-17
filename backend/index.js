const express = require("express")
const mongoose = require("mongoose")


const app = express()
const cors = require("cors");

const apirouting = require("../backend/routes/apiroutes")
PORT= process.env.PORT || 5000
app.use(cors());   //to enable cors request
mongoose.set('strictQuery', false);
const URL = `mongodb+srv://user1:user1@edureka.ild8fi0.mongodb.net/hotel_booking?retryWrites=true&w=majority`
// app.listen(PORT,()=>{
//     console.log("server started at the port No",PORT)
// })


app.use(express.json());   //converting the string json data to pure json data
app.use(express.urlencoded({extended:false})); // normal post data to json data
app.use("/",apirouting);


console.log("connecting to db");
mongoose.connect(URL).then(()=>{
    app.listen(PORT,() => {
        // console.log("database connected"
        console.log("app is running ",PORT);
    });
}).catch((error)=>{
    console.log(error);
});
