import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:String,role:String,tagline:String,email:String,phone:String,location:String,about:String,github:String,linkedin:String,resume:String,heroImage:{type:String,default:''},aboutImage:{type:String,default:''}},{timestamps:true});
export default mongoose.model('Profile',schema);
