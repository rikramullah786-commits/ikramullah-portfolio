import mongoose from 'mongoose';
const schema=new mongoose.Schema({company:{type:String,required:true},role:String,start:String,end:String,location:String,description:String},{timestamps:true});export default mongoose.model('Experience',schema);
