import jwt from 'jsonwebtoken';import mongoose from 'mongoose';import Profile from '../models/Profile.js';import Skill from '../models/Skill.js';import Experience from '../models/Experience.js';import Project from '../models/Project.js';import Guestbook from '../models/Guestbook.js';
import crypto from 'crypto';
const slugify=s=>String(s||'project').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const cleanArray=v=>Array.isArray(v)?v.filter(Boolean):[];
const cleanScreenshots=v=>Array.isArray(v)?v.filter(Boolean).map(x=>{
  if(typeof x==='string') return {image:x,title:'',description:''};
  return {image:String(x.image||''),title:String(x.title||''),description:String(x.description||'')};
}).filter(x=>x.image):[];
const requireDB=()=>{if(mongoose.connection.readyState!==1){const e=new Error('MongoDB is not connected. Start MongoDB to use the admin editor.');e.status=503;throw e;}};
export function login(req,res){const {username,password}=req.body||{};if(username!==(process.env.ADMIN_USERNAME||'admin')||password!==(process.env.ADMIN_PASSWORD||'ikramullah@2026'))return res.status(401).json({message:'Invalid username or password'});const token=jwt.sign({role:'admin'},process.env.JWT_SECRET||'dev-secret',{expiresIn:'7d'});res.json({token})}
export async function getProfile(req,res){requireDB();res.json(await Profile.findOne().lean()||{})}
export async function updateProfile(req,res){requireDB();const doc=await Profile.findOneAndUpdate({},req.body,{new:true,upsert:true,setDefaultsOnInsert:true});res.json(doc)}
export async function createProject(req,res){requireDB();const b=req.body||{};const p=await Project.create({...b,slug:b.slug||slugify(b.title),tech:cleanArray(b.tech),features:cleanArray(b.features),screenshots:cleanArray(b.screenshots)});res.status(201).json(p)}
export async function updateProject(req,res){requireDB();const b={...(req.body||{})};delete b._id;delete b.id;if(b.slug)b.slug=slugify(b.slug);else if(b.title)b.slug=slugify(b.title);for(const k of ['tech','features'])if(k in b)b[k]=cleanArray(b[k]);
if('screenshots' in b)b.screenshots=cleanScreenshots(b.screenshots);
if(!b.coverImage && Array.isArray(b.screenshots) && b.screenshots[0]?.image)b.coverImage=b.screenshots[0].image;const p=await resolveByIdOrLegacy(Project,req.params.id,['slug','title']);if(!p)return res.status(404).json({message:'Project not found'});Object.assign(p,b);const saved=await p.save();res.json(saved)}
export async function deleteProject(req,res){requireDB();const p=await resolveByIdOrLegacy(Project,req.params.id,['slug','title']);if(!p)return res.status(404).json({message:'Project not found'});await p.deleteOne();res.json({message:'Project deleted'})}
export async function createSkill(req,res){requireDB();res.status(201).json(await Skill.create({...req.body,level:Number(req.body.level)||0}))}
const resolveByIdOrLegacy = async (Model, rawId, legacyFields=[]) => {
  const id=String(rawId||'').trim();
  if(!id) return null;
  if(mongoose.isValidObjectId(id)) return Model.findById(id);
  const escaped=id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  for(const field of legacyFields){
    const doc=await Model.findOne({[field]:{$regex:`^${escaped}$`,$options:'i'}});
    if(doc) return doc;
  }
  return null;
};
export async function updateSkill(req,res){requireDB();const b={...req.body};delete b._id;delete b.id;if('level'in b)b.level=Number(b.level)||0;const doc=await resolveByIdOrLegacy(Skill,req.params.id,['name']);if(!doc)return res.status(404).json({message:'Skill not found'});Object.assign(doc,b);const x=await doc.save();res.json(x)}
export async function deleteSkill(req,res){requireDB();const doc=await resolveByIdOrLegacy(Skill,req.params.id,['name']);if(!doc)return res.status(404).json({message:'Skill not found'});await doc.deleteOne();res.json({message:'Skill deleted'})}
export async function createExperience(req,res){requireDB();res.status(201).json(await Experience.create(req.body))}
export async function updateExperience(req,res){requireDB();const b={...req.body};delete b._id;delete b.id;const doc=await resolveByIdOrLegacy(Experience,req.params.id,['company']);if(!doc)return res.status(404).json({message:'Experience not found'});Object.assign(doc,b);const x=await doc.save();res.json(x)}
export async function deleteExperience(req,res){requireDB();const doc=await resolveByIdOrLegacy(Experience,req.params.id,['company']);if(!doc)return res.status(404).json({message:'Experience not found'});await doc.deleteOne();res.json({message:'Experience deleted'})}
async function uploadToCloudinary(file){
  const cloudName=process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey=process.env.CLOUDINARY_API_KEY;
  const apiSecret=process.env.CLOUDINARY_API_SECRET;
  if(!cloudName||!apiKey||!apiSecret) throw new Error('Cloudinary is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in production.');
  const timestamp=Math.floor(Date.now()/1000);
  const folder='ikramullah-portfolio';
  const signature=crypto.createHash('sha1').update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`).digest('hex');
  const form=new FormData();
  form.append('file',new Blob([file.buffer],{type:file.mimetype}),file.originalname);
  form.append('api_key',apiKey);form.append('timestamp',String(timestamp));form.append('folder',folder);form.append('signature',signature);
  const response=await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,{method:'POST',body:form});
  const body=await response.json();
  if(!response.ok) throw new Error(body?.error?.message||'Cloudinary upload failed');
  return body.secure_url;
}

export async function addScreenshots(req,res){
  requireDB();
  const p=await Project.findById(req.params.id);
  if(!p)return res.status(404).json({message:'Project not found'});
  const files=req.files||[];
  if(!files.length)return res.status(400).json({message:'No images received'});
  const incoming=[];
  for(const file of files){
    const image=await uploadToCloudinary(file);
    incoming.push({image,title:'',description:''});
  }
  p.screenshots=[...(p.screenshots||[]),...incoming];
  if(!p.coverImage&&incoming[0]?.image)p.coverImage=incoming[0].image;
  await p.save();
  res.json(p);
}
export async function deleteScreenshot(req,res){requireDB();const p=await Project.findById(req.params.id);if(!p)return res.status(404).json({message:'Project not found'});const i=Number(req.params.index);if(Number.isNaN(i)||i<0||i>=p.screenshots.length)return res.status(400).json({message:'Invalid screenshot index'});p.screenshots.splice(i,1);await p.save();res.json(p)}

export async function getGuestbook(req,res){requireDB();res.json(await Guestbook.find().sort({createdAt:-1}).lean())}
