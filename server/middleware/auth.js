import jwt from 'jsonwebtoken';
export function requireAdmin(req,res,next){try{const header=req.headers.authorization||'';const token=header.startsWith('Bearer ')?header.slice(7):'';if(!token)throw new Error('Missing token');req.admin=jwt.verify(token,process.env.JWT_SECRET||'dev-secret');next()}catch{res.status(401).json({message:'Unauthorized. Please log in again.'})}}
