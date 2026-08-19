import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import mongoose from 'mongoose';
import {connectDB} from './config/db.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const app=express();
const PORT=Number(process.env.PORT||5000);

const allowedOrigins=String(process.env.FRONTEND_URL||'').split(',').map(v=>v.trim()).filter(Boolean);
app.use(cors({origin:(origin,cb)=>{if(!origin||allowedOrigins.length===0||allowedOrigins.includes(origin))return cb(null,true);cb(new Error('CORS origin not allowed'));},credentials:true}));
app.use(express.json({limit:'2mb'}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.get('/api/health',(req,res)=>res.json({ok:true,database:mongoose.connection.readyState===1}));
app.use('/api',publicRoutes);
app.use('/api/admin',adminRoutes);
app.use((err,req,res,next)=>{console.error('[API ERROR]',err);res.status(err.status||500).json({message:err.message||'Server error'})});

// Start HTTP first. The portfolio can render from the built-in fallback even
// when MongoDB is not installed/running yet. If MongoDB becomes available,
// all public/admin APIs automatically use the database.
const server=app.listen(PORT,()=>console.log(`API running on http://localhost:${PORT}`));

let retryTimer=null;
const connectWithRetry=async()=>{
  if(mongoose.connection.readyState===1||mongoose.connection.readyState===2)return;
  try{
    await connectDB();
    console.log('MongoDB connected — dynamic database mode enabled');
    if(retryTimer){clearInterval(retryTimer);retryTimer=null;}
  }catch(err){
    console.warn(`MongoDB unavailable: ${err.message}`);
    console.warn('Fallback mode is active; the public portfolio remains available.');
  }
};
await connectWithRetry();
if(mongoose.connection.readyState!==1){retryTimer=setInterval(connectWithRetry,5000);}

const shutdown=async()=>{if(retryTimer)clearInterval(retryTimer);server.close();if(mongoose.connection.readyState!==0)await mongoose.disconnect();process.exit(0)};
process.on('SIGINT',shutdown);
process.on('SIGTERM',shutdown);
