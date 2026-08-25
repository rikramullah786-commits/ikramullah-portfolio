import mongoose from 'mongoose';
const schema=new mongoose.Schema({title:{type:String,required:true},issuer:String,date:String,description:String,credentialUrl:String,image:{type:String,default:''}},{timestamps:true});
export default mongoose.model('Certificate',schema);
