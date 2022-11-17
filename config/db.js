const mongoose = require('mongoose');//initialize mongoose; mongoose is what we are using to connect
//const config = require('config');//initiate config conatant to grab string from default.json
require('dotenv').config();//for environment variable
const db = process.env.MongoURI//config.get('mongoURI');assign string from default.json to const db

const connectDB = async () => { // function for connecting to mongodb
    try{
        await mongoose.connect(db);//this returns promise. await unwraps promise for try catch block. if promise doesnt hold will go to catch 
        console.log('MongoDB Connected...');
    } catch(err) {
        console.log(err.message);
        //exit process if cannot connect to mongodb
        process.exit(1);
    }
}

module.exports = connectDB;