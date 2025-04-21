import mongoose from "mongoose";

type connectionObject =  {
    isConnected?: Number
}

const connection : connectionObject = {};

export default async function dbConnect() : Promise<void>{
    if(connection.isConnected){
        console.log("Database is already connected");
        return ;
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {
            dbName:"Skinalyze"
        })
        connection.isConnected = db.connections[0].readyState;
        console.log("Db connected Successfully");
    } catch (error) {
        console.log("error while connecting to database",error);
        // process.exit(1);
    }
}