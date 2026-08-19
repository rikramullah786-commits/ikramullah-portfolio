import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,default:'Ikramullah R'},role:String,tagline:String,email:String,phone:String,location:String,about:String,github:String,linkedin:String,resume:String},{timestamps:true});
export default mongoose.model('Profile',schema);
