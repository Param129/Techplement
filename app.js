const express = require('express');
const fs=require('fs');
const QuoteRoute=require('./Routes/QuoteRoute.js')

let app = express();





app.use(express.json({limit:'50kb'}))//middleware for adding req.body to req;


app.use('/', QuoteRoute);


module.exports=app;
