import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:40},contact:{type:String,trim:true,maxlength:120,default:''}},{timestamps:true});
export default mongoose.model('Guestbook',schema);
