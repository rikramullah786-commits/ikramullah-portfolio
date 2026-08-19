import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Project from '../models/Project.js';
import Guestbook from '../models/Guestbook.js';
import {fallbackPortfolio} from '../data/fallback.js';

const guestbookFallback=[];
const dbReady=()=>mongoose.connection.readyState===1;

export async function portfolio(req,res){
  if(!dbReady()) return res.json(fallbackPortfolio);
  const [profile,skills,experience,projects]=await Promise.all([
    Profile.findOne().lean(),
    Skill.find().sort({createdAt:1}).lean(),
    Experience.find().sort({createdAt:1}).lean(),
    Project.find().sort({no:1,createdAt:1}).lean()
  ]);
  res.json({profile:profile||fallbackPortfolio.profile,skills:skills||[],experience:experience||[],projects:projects||[]});
}

export async function profile(req,res){
  if(!dbReady()) return res.json(fallbackPortfolio.profile);
  res.json(await Profile.findOne().lean()||fallbackPortfolio.profile);
}

export async function skills(req,res){
  if(!dbReady()) return res.json(fallbackPortfolio.skills);
  res.json(await Skill.find().sort({createdAt:1}).lean());
}

export async function experience(req,res){
  if(!dbReady()) return res.json(fallbackPortfolio.experience);
  res.json(await Experience.find().sort({createdAt:1}).lean());
}

export async function projects(req,res){
  if(!dbReady()) return res.json(fallbackPortfolio.projects);
  res.json(await Project.find().sort({no:1,createdAt:1}).lean());
}

export async function projectBySlug(req,res){
  if(!dbReady()){
    const p=fallbackPortfolio.projects.find(x=>x.slug===req.params.slug||x.id===req.params.slug);
    return p?res.json(p):res.status(404).json({message:'Project not found'});
  }
  const query=mongoose.isValidObjectId(req.params.slug)?{$or:[{slug:req.params.slug},{_id:req.params.slug}]}:{slug:req.params.slug};
  const p=await Project.findOne(query).lean();
  if(!p)return res.status(404).json({message:'Project not found'});
  res.json(p);
}

export async function guestbook(req,res){
  const name=String(req.body?.name||'').trim();
  const contact=String(req.body?.contact||'').trim();
  if(!name)return res.status(400).json({message:'Name is required'});
  if(contact.length>120)return res.status(400).json({message:'Contact is too long'});
  if(!dbReady()){
    guestbookFallback.unshift({id:`guest-${Date.now()}`,name,contact,createdAt:new Date().toISOString()});
    return res.status(201).json({message:'Signed successfully',fallback:true});
  }
  await Guestbook.create({name,contact});
  res.status(201).json({message:'Signed successfully'});
}

export async function guestbookList(req,res){
  if(!dbReady()) return res.json(guestbookFallback);
  res.json(await Guestbook.find().sort({createdAt:-1}).lean());
}
