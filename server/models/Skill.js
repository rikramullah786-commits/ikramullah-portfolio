import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true},category:String,level:{type:Number,min:0,max:100,default:0},description:String},{timestamps:true});export default mongoose.model('Skill',schema);
