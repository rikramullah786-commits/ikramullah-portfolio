import mongoose from 'mongoose';

const screenshotSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  order: { type: Number, default: 1 }
}, {_id: true});

const schema = new mongoose.Schema({
  no:String,title:{type:String,required:true},slug:{type:String,unique:true,sparse:true,index:true},
  type:String,status:String,year:String,accent:String,summary:String,description:String,
  tech:{type:[String],default:[]},features:{type:[String],default:[]},
  coverImage:{type:String,default:''},screenshots:{type:[screenshotSchema],default:[]},
  github:String,live:String
},{timestamps:true});

export default mongoose.model('Project',schema);
