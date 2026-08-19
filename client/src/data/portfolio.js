import {assetUrl} from '../api/client';

export const FALLBACK = {
  profile:{name:'Ikramullah R',role:'Full Stack Developer',tagline:'I turn real business problems into reliable web applications — from ERP systems and dashboards to APIs and everyday tools.',email:'rikramullah786@gmail.com',phone:'+91 8220800693',location:'Salem, Tamil Nadu, India',about:'I am Ikramullah, a Full Stack Developer who enjoys taking complicated requirements and turning them into simple, usable software. I work across the interface, backend, API and database because I want to understand the whole problem — not just one piece of it.',github:'https://github.com/rikramullah786-commits',linkedin:'https://www.linkedin.com/in/ikramullah-r-b34169337/',resume:'/resume.pdf'},
  skills:[
    {id:'react',name:'React',category:'Frontend',level:90,description:'I use React to turn business requirements into responsive, reusable interfaces that are clear for the people using them.'},
    {id:'node',name:'Node.js',category:'Backend',level:88,description:'I build the backend logic, REST APIs, authentication and workflows that keep applications reliable behind the interface.'},
    {id:'javascript',name:'JavaScript',category:'Language',level:92,description:'My everyday language for connecting interfaces, APIs, interactions and the small details that make applications feel alive.'},
    {id:'java',name:'Java',category:'Language',level:82,description:'My foundation for object-oriented thinking, backend development and understanding how larger applications are structured.'},
    {id:'mongodb',name:'MongoDB',category:'Database',level:86,description:'I use MongoDB and Mongoose to model application data and build database-backed features for real business workflows.'},
    {id:'bootstrap',name:'Bootstrap',category:'UI',level:88,description:'I use Bootstrap to build responsive interfaces quickly while keeping layouts practical and maintainable.'}
  ],
  experience:[
    {id:'e1',company:'Shiash Info Solutions',role:'Java Developer Intern',start:'2023',end:'2023',location:'Chennai',description:'I started by learning how real development teams turn requirements into working software, while building my Java fundamentals through a three-month internship.'},
    {id:'e2',company:'JSPIDERS',role:'Full Stack Java Developer Training',start:'2024',end:'2024',location:'Bangalore',description:'I strengthened my Java, web and database fundamentals and learned to think beyond isolated code toward complete applications.'},
    {id:'e3',company:'Aalan Tech Soft',role:'Software Developer',start:'2025',end:'Present',location:'Salem',description:'I build and maintain production ERP modules using React, Bootstrap, Node.js, Express and MongoDB — turning real business requirements into features people can use.'}
  ],
  projects:[
    {id:'hotel-erp',no:'01',title:'Hotel Management ERP',slug:'hotel-management-erp',type:'FULL STACK PROJECT',status:'SHIPPED',year:'2025',accent:'mint',summary:'One system for the work behind a hotel.',description:'I built a full-stack Hotel Management ERP to bring daily operations into one system — from food and suppliers to customers, billing, inventory, reports and role-based access.',tech:['React','Bootstrap','Node.js','Express','MongoDB'],features:['Role-based access','Billing & invoices','Inventory & stock','Reports dashboard'],screenshots:[],coverImage:'',github:'#',live:'#'},
    {id:'jewellery-erp',no:'02',title:'Jewellery ERP',slug:'jewellery-erp',type:'FULL STACK PROJECT',status:'SHIPPED',year:'2026',accent:'peach',summary:'Turning manual jewellery operations into a digital workflow.',description:'I built a Jewellery ERP around the workflows that matter: inventory, sales, exchanges, customers, retailers, billing and reports, with secure CRUD and role-based authorization.',tech:['React','Bootstrap','PHP','MySQL'],features:['Inventory management','Sales & exchanges','Retailer workflows','Reports'],screenshots:[],coverImage:'',github:'#',live:'#'},
    {id:'weather',no:'03',title:'Weather Web Application',slug:'weather-web-application',type:'WEB PROJECT',status:'SHIPPED',year:'2024',accent:'sky',summary:'A simple interface for live weather information.',description:'I built a responsive weather application that makes live city weather information easy to search, understand and use.',tech:['HTML','CSS','JavaScript','Tailwind CSS'],features:['Live city search','Responsive UI','Weather data'],screenshots:[],coverImage:'',github:'#',live:'#'}
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
