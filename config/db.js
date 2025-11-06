import mongoose from  "mongoose"
export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("mongodb connected");
        
    } catch (error) {
        console.log("mongoDb connection error",error.message);
        
    }
}