import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async()=>{
     mongoose.set('strictQuery' , true);
     if(!process.env.MONGOODB_URL) return console.log("MONGOODB URL not found");
     if(isConnected){
        return console.log("Already connected to the database");
     }
     try {
        await mongoose.connect(process.env.MONGOODB_URL)
        isConnected = true;
        console.log("Connected to the database");
     } catch (error) {
        console.log(error);
     }
}