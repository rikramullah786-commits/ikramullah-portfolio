import {assetUrl} from '../api/client';

export const FALLBACK = {
  profile:{name:'Ikramullah R',role:'Full Stack Developer',tagline:'I build useful software with thoughtful interfaces, reliable APIs, and a little bit of personality.',email:'rikramullah786@gmail.com',phone:'+91 8220800693',location:'Salem, Tamil Nadu, India',about:'A full-stack developer who likes clean interfaces, practical systems, and learning by building.',github:'https://github.com/rikramullah786-commits',linkedin:'https://www.linkedin.com/in/ikramullah-r-b34169337/',resume:'/resume.pdf'},
  skills:[
    {id:'react',name:'React',category:'Frontend',level:90,description:'Component architecture, state, routing and animated interfaces.'},
    {id:'node',name:'Node.js',category:'Backend',level:88,description:'REST APIs, middleware, authentication and server-side workflows.'},
    {id:'javascript',name:'JavaScript',category:'Language',level:92,description:'Modern ES modules, async flows and interactive UI logic.'},
    {id:'java',name:'Java',category:'Language',level:82,description:'OOP, collections, backend fundamentals and enterprise patterns.'},
    {id:'mongodb',name:'MongoDB',category:'Database',level:86,description:'Mongoose schemas, aggregation, indexes and API data modeling.'},
    {id:'bootstrap',name:'Bootstrap',category:'UI',level:88,description:'Responsive production interfaces without Tailwind.'}
  ],
  experience:[
    {id:'e1',company:'Shiash Info Solutions',role:'Java Developer Intern',start:'2023',end:'2023',location:'Chennai',description:'Completed a three-month Java developer internship.'},
    {id:'e2',company:'JSPIDERS',role:'Full Stack Java Developer Training',start:'2024',end:'2024',location:'Bangalore',description:'Full-stack Java development training.'},
    {id:'e3',company:'Aalan Tech Soft',role:'Software Developer',start:'2025',end:'Present',location:'Salem',description:'Building ERP modules, REST APIs and reusable React components.'}
  ],
  projects:[
    {id:'hotel-erp',no:'01',title:'Hotel Management ERP',slug:'hotel-management-erp',type:'FULL STACK PROJECT',status:'SHIPPED',year:'2025',accent:'mint',summary:'A complete hotel operations platform.',description:'A full-stack ERP for hotel operations with food lists, billing, suppliers, customers, inventory, reports, authentication and role-based access.',tech:['React','Bootstrap','Node.js','Express','MongoDB'],features:['Role-based access','Billing & invoices','Inventory & stock','Reports dashboard'],screenshots:[],coverImage:'',github:'#',live:'#'},
    {id:'jewellery-erp',no:'02',title:'Jewellery ERP',slug:'jewellery-erp',type:'FULL STACK PROJECT',status:'SHIPPED',year:'2026',accent:'peach',summary:'Business management for jewellery operations.',description:'A business management system for inventory, sales, exchanges, customers, retailers, billing and reports with secure CRUD and role-based authorization.',tech:['React','Bootstrap','PHP','MySQL'],features:['Inventory management','Sales & exchanges','Retailer workflows','Reports'],screenshots:[],coverImage:'',github:'#',live:'#'},
    {id:'weather',no:'03',title:'Weather Web Application',slug:'weather-web-application',type:'WEB PROJECT',status:'SHIPPED',year:'2024',accent:'sky',summary:'A responsive real-time weather experience.',description:'A responsive weather experience with real-time city data and a clean, user-friendly interface.',tech:['HTML','CSS','JavaScript','Tailwind CSS'],features:['Live city search','Responsive UI','Weather data'],screenshots:[],coverImage:'',github:'#',live:'#'}
  ]
};

const arr = (v, fallback=[]) => Array.isArray(v) ? v.filter(Boolean) : fallback;
const slugify = s => String(s||'project').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const imageUrl = value => value ? assetUrl(value) : '';

export function normalizePortfolio(incoming={}) {
  const source = incoming && typeof incoming === 'object' ? incoming : {};
  const profile = {...FALLBACK.profile, ...(source.profile && typeof source.profile==='object' ? source.profile : {})};
  const skills = arr(source.skills,FALLBACK.skills).map((s,i)=>({...FALLBACK.skills[i%FALLBACK.skills.length], ...(s||{}), id:String(s?._id||s?.id||`skill-${i+1}`), level:Math.max(0,Math.min(100,Number(s?.level ?? 0)||0))}));
  const experience = arr(source.experience,FALLBACK.experience).map((x,i)=>({...FALLBACK.experience[i%FALLBACK.experience.length], ...(x||{}), id:String(x?._id||x?.id||`experience-${i+1}`)}));
  const projects = arr(source.projects,FALLBACK.projects).map((p,i)=>({...FALLBACK.projects[i%FALLBACK.projects.length], ...(p||{}), id:String(p?._id||p?.id||`project-${i+1}`), no:p?.no||String(i+1).padStart(2,'0'), slug:p?.slug||slugify(p?.title||p?.id||`project-${i+1}`), tech:arr(p?.tech), features:arr(p?.features), coverImage:imageUrl(p?.coverImage||''), screenshots:arr(p?.screenshots).map((s)=>typeof s==='string'?{image:imageUrl(s),title:'',description:''}:{image:imageUrl(String(s?.image||'')),title:String(s?.title||''),description:String(s?.description||'')}).filter(s=>s.image)}));
  return {profile,skills,experience,projects};
}
