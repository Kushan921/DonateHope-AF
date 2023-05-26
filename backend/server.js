const express = require("express"); //using the json file dependencies(node_modules)
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//declare a constant variable
const app = express();
//require  for read variables(MONGODB_URL)
require("dotenv").config();

app.use(cors());
var bodyParser = require('body-parser');              
app.use(bodyParser.json());


//database link
const URL = process.env.MONGODB_URL;

const PORT = process.env.PORT || 8020;
//create mongo configurations

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mongoDB connection successful !!!");
})

// doctor
const doctorRouter = require('./routes/DoctorRoute')
app.use("/doctor",doctorRouter);

// master
const masterRouter = require('./routes/MasterRoute')
app.use("/master",masterRouter);

// users
const userRouter = require('./routes/UserRoute')
app.use("/user",userRouter);

// emergency request
const emergencyRouter = require('./routes/EmergencyRoute')
app.use("/emergency",emergencyRouter);


// normal request
const normalRouter = require('./routes/NormalRoute')
app.use("/normal",normalRouter);

// blood request
const bloodRouter = require('./routes/BloodRoute')
app.use("/blood",bloodRouter);





//run the app using port
app.listen(PORT, () =>{
    console.log(`Server is up and running on port number: ${PORT}`);

})

   