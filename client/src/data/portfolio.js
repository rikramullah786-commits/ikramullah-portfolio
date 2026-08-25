import {assetUrl} from '../api/client';

const arr=v=>Array.isArray(v)?v.filter(Boolean):[];
const slugify=s=>String(s||'project').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const imageUrl=v=>v?assetUrl(v):'';

export function normalizePortfolio(incoming={}){
 const source=incoming&&typeof incoming==='object'?incoming:{};
 const p=source.profile&&typeof source.profile==='object'?source.profile:{};
 const profile={
  name:String(p.name||''),role:String(p.role||''),tagline:String(p.tagline||''),
  email:String(p.email||''),phone:String(p.phone||''),location:String(p.location||''),
  about:String(p.about||''),github:String(p.github||''),linkedin:String(p.linkedin||''),
  resume:String(p.resume||''),heroImage:imageUrl(p.heroImage||''),aboutImage:imageUrl(p.aboutImage||'')
 };
 const skills=arr(source.skills).map((s,i)=>({...s,id:String(s?._id||s?.id||`skill-${i+1}`),level:Math.max(0,Math.min(100,Number(s?.level)||0))}));
 const experience=arr(source.experience).map((x,i)=>({...x,id:String(x?._id||x?.id||`experience-${i+1}`)}));
 const projects=arr(source.projects).map((p,i)=>({...p,id:String(p?._id||p?.id||`project-${i+1}`),no:p?.no||String(i+1).padStart(2,'0'),slug:p?.slug||slugify(p?.title||p?.id),tech:arr(p?.tech),features:arr(p?.features),coverImage:imageUrl(p?.coverImage||''),screenshots:arr(p?.screenshots).map(s=>typeof s==='string'?{image:imageUrl(s),title:'',description:''}:{image:imageUrl(s?.image||''),title:String(s?.title||''),description:String(s?.description||'')}).filter(s=>s.image)}));
 const certificates=arr(source.certificates).map((c,i)=>({...c,id:String(c?._id||c?.id||`certificate-${i+1}`),image:imageUrl(c?.image||'')}));
 return {profile,skills,experience,projects,certificates};
}
