import mongoose from "mongoose";

const connection = {
    isConnected: false,
}


const dbConnect = async () => {

    if(connection.isConnected){
        console.log('Already connected to database');
        return;
    }

    try {
        
        await mongoose.connect(process.env.MONGO_DB_URI);

        console.log('Connected to MongoDB');

        connection.isConnected = true;

    } catch (error) {
        console.error('Database connection failed ', error);
        process.exit(1);
    }
}

export default dbConnect;