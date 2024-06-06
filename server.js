const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

const mongoose = require('mongoose'); 




const app=require('./app.js');

// connecting mongoDB
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
}).then((conn)=>{
    // console.log(conn);
    console.log("DB connection successfull")
})





const server = app.listen(process.env.PORT,()=>{
    console.log("server started");
})



 