import {Router} from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {requireAdmin} from '../middleware/auth.js';
import * as c from '../controllers/adminController.js';

const uploadDir=path.resolve('uploads');
fs.mkdirSync(uploadDir,{recursive:true});

// Keep local development convenient. In production the controller uploads the
// file to Cloudinary so images survive Render redeploys/restarts.
const storage=multer.memoryStorage();
const upload=multer({
  storage,
  limits:{fileSize:10*1024*1024},
  fileFilter:(req,file,cb)=>cb(null,/^image\/(jpeg|png|webp|gif|avif)$/.test(file.mimetype))
});

const r=Router();
r.post('/login',c.login);
r.use(requireAdmin);
r.get('/profile',c.getProfile);
r.get('/guestbook',c.getGuestbook);
r.put('/profile',c.updateProfile);
r.post('/projects',c.createProject);
r.put('/projects/:id',c.updateProject);
r.delete('/projects/:id',c.deleteProject);
r.post('/projects/:id/screenshots',upload.array('images',30),c.addScreenshots);
r.delete('/projects/:id/screenshots/:index',c.deleteScreenshot);
r.post('/skills',c.createSkill);
r.put('/skills/:id',c.updateSkill);
r.delete('/skills/:id',c.deleteSkill);
r.post('/experience',c.createExperience);
r.put('/experience/:id',c.updateExperience);
r.delete('/experience/:id',c.deleteExperience);
export default r;
