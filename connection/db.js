import mongoose from "mongoose";


let MONGOURI = 'mongodb+srv://piyushchoudhary:12mwyBodLXnVJsXu@cluster0.m9wtbbg.mongodb.net/'
const connectDB = async ()=> {
    await mongoose.connect(MONGOURI).then(()=> {
        console.log('Database connected');
    }).catch(() => {
        console.log(error);
    })
}

export default connectDB;