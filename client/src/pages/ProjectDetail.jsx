import React,{useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import {ArrowLeft,ArrowUpRight,ChevronLeft,ChevronRight,ExternalLink,Github,Sparkles} from 'lucide-react';

const shot=(s)=>typeof s==='string'?{image:s,title:'',description:''}:s||{};

export default function ProjectDetail({data}){
  const {slug}=useParams(),navigate=useNavigate();
  const p=data.projects.find(x=>(x?.slug||x?.id)===slug);
  const [index,setIndex]=useState(0),[lightbox,setLightbox]=useState(false);
  if(!p)return <main className="not-found"><h1>PROJECT NOT FOUND.</h1><Link to="/">Return home ↗</Link></main>;

  const gallery=(Array.isArray(p.screenshots)?p.screenshots:[]).map(shot).filter(x=>x.image);
  const images=[...(p.coverImage && !gallery.some(x=>x.image===p.coverImage)?[{image:p.coverImage,title:'Project overview',description:''}]:[]),...gallery];
  const current=images[index]||{};
  const next=()=>setIndex(i=>images.length?(i+1)%images.length:0);
  const prev=()=>setIndex(i=>images.length?(i-1+images.length)%images.length:0);

  return <main className="detail-page">
    <section className="detail-hero">
      <Link className="back-link" to="/"><ArrowLeft size={17}/> Back to world</Link>
      <p className="eyebrow">CASE STUDY / {p.no||'01'} / {p.year}</p>
      <h1>{p.title}</h1>
      <p className="detail-summary">{p.summary||p.description}</p>
      <div className="detail-tags">{(p.tech||[]).map(t=><span key={t}>{t}</span>)}</div>
    </section>

    <section className="case-layout">
      <div>
        <div className="case-image" onClick={()=>current.image&&setLightbox(true)}>
          {current.image?<img src={current.image} alt={current.title||`${p.title} screenshot ${index+1}`}/>:<div className="empty-visual"><Sparkles size={42}/><span>Add screenshots from Admin</span></div>}
          <span className="image-counter">{images.length?`${index+1} / ${images.length}`:'NO IMAGES YET'}</span>
        </div>
        {images.length>1&&<div className="thumb-row">{images.map((s,i)=><button type="button" key={`${s.image}-${i}`} className={i===index?'selected':''} onClick={()=>setIndex(i)}><img src={s.image} alt={s.title||''}/></button>)}</div>}
      </div>
      <aside className="case-side">
        <p className="eyebrow">PROJECT INTELLIGENCE</p>
        <div className="fact"><span>STATUS</span><b>{p.status}</b></div><div className="fact"><span>YEAR</span><b>{p.year}</b></div><div className="fact"><span>TYPE</span><b>{p.type}</b></div>
        {p.live&&p.live!=='#'&&<a href={p.live} target="_blank" rel="noreferrer">Live project <ExternalLink size={15}/></a>}
        {p.github&&p.github!=='#'&&<a href={p.github} target="_blank" rel="noreferrer">GitHub <Github size={15}/></a>}
      </aside>
    </section>

    <section className="case-story">
      <div><p className="eyebrow">THE BUILD</p><h2>Inside the <em>project.</em></h2></div>
      <div><p className="story-copy">{p.description}</p><div className="feature-grid">{(p.features||[]).map((f,i)=><article key={`${f}-${i}`}><span>0{i+1}</span><b>{f}</b><small>Designed as part of the product workflow and kept editable from the portfolio cockpit.</small></article>)}</div></div>
    </section>

    {images.length>0&&<section className="case-gallery">
      <div className="case-gallery-heading"><div><p className="eyebrow">PROJECT JOURNEY</p><h2>What I <em>built.</em></h2></div><span>{images.length} VISUAL SECTIONS</span></div>
      <div className="case-sections">
        {images.map((s,i)=><article className="case-section" key={`${s.image}-${i}`}>
          <div className="case-section-number">0{i+1}</div>
          <div className="case-section-image" onClick={()=>{setIndex(i);setLightbox(true)}}><img src={s.image} alt={s.title||`${p.title} screenshot ${i+1}`}/></div>
          <div className="case-section-copy"><p className="eyebrow">SCREEN {String(i+1).padStart(2,'0')}</p><h3>{s.title||`Project section ${i+1}`}</h3><p>{s.description||'Add a description for this screenshot from the admin cockpit to explain exactly what was built, changed, or solved here.'}</p></div>
        </article>)}
      </div>
    </section>}

    <section className="case-tech"><p className="eyebrow">TECH STACK</p><div>{(p.tech||[]).map(t=><span key={t}>{t}</span>)}</div></section>
    <div className="next-project"><button type="button" onClick={()=>{if(data.projects.length<2)return;const i=data.projects.findIndex(x=>x.id===p.id);const n=data.projects[(i+1)%data.projects.length];navigate(`/project/${n.slug||n.id}`)}}>NEXT PROJECT <ArrowUpRight/></button></div>
    {lightbox&&<div className="lightbox" onClick={()=>setLightbox(false)}><button type="button" onClick={e=>{e.stopPropagation();prev()}}><ChevronLeft/></button><img src={current.image} alt=""/><button type="button" onClick={e=>{e.stopPropagation();next()}}><ChevronRight/></button><span>CLICK ANYWHERE TO CLOSE</span></div>}
  </main>
}
