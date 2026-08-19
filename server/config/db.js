import mongoose from 'mongoose';

export async function connectDB(){
  const uri=process.env.MONGODB_URI||'mongodb://127.0.0.1:27017/ikramullah_portfolio';
  await mongoose.connect(uri,{serverSelectionTimeoutMS:3000,connectTimeoutMS:3000});
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}
export const dbReady=()=>mongoose.connection.readyState===1;
