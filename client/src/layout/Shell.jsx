import React,{useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {Menu,X} from 'lucide-react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
gsap.registerPlugin(ScrollTrigger);
export default function Shell({children,animationKey=''}){
 const [menu,setMenu]=useState(false),cursor=useRef(null),dot=useRef(null),progress=useRef(null);
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const lenis=new Lenis({autoRaf:true,smoothWheel:true,lerp:.075});
  const move=e=>{gsap.to(cursor.current,{x:e.clientX,y:e.clientY,duration:.22,ease:'power2.out'});gsap.to(dot.current,{x:e.clientX,y:e.clientY,duration:.04});document.documentElement.style.setProperty('--mx',`${e.clientX}px`);document.documentElement.style.setProperty('--my',`${e.clientY}px`)};
  window.addEventListener('mousemove',move); const magnetic=[...document.querySelectorAll('.magnetic')];
  const onMag=e=>{const r=e.currentTarget.getBoundingClientRect();gsap.to(e.currentTarget,{x:(e.clientX-r.left-r.width/2)*.14,y:(e.clientY-r.top-r.height/2)*.14,duration:.25})};const off=e=>gsap.to(e.currentTarget,{x:0,y:0,duration:.55,ease:'elastic.out(1,.35)'});magnetic.forEach(x=>{x.addEventListener('mousemove',onMag);x.addEventListener('mouseleave',off)});
  return()=>{lenis.destroy();window.removeEventListener('mousemove',move);magnetic.forEach(x=>{x.removeEventListener('mousemove',onMag);x.removeEventListener('mouseleave',off)})}},[]);
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;let ctx;let resizeObserver;let cancelled=false;
  const refresh=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>ScrollTrigger.refresh()));
  ctx=gsap.context(()=>{gsap.utils.toArray('.reveal').forEach((el,i)=>gsap.fromTo(el,{y:55,opacity:0,rotateX:7},{y:0,opacity:1,rotateX:0,duration:.95,delay:(i%4)*.035,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));gsap.to(progress.current,{scaleX:1,transformOrigin:'left center',ease:'none',scrollTrigger:{trigger:document.body,start:'top top',end:'bottom bottom',scrub:.15}});gsap.to('.ambient-orb',{y:-45,duration:4,repeat:-1,yoyo:true,stagger:.7,ease:'sine.inOut'});gsap.to('.hero-art .orbit-a',{rotation:360,duration:28,repeat:-1,ease:'none'});gsap.to('.hero-art .orbit-b',{rotation:-360,duration:38,repeat:-1,ease:'none'});},document.body);
  refresh();
  window.addEventListener('load',refresh);
  if(document.fonts?.ready) document.fonts.ready.then(refresh).catch(()=>{});
  document.querySelectorAll('img').forEach(img=>{if(!img.complete)img.addEventListener('load',refresh,{once:true});});
  const main=document.querySelector('main');
  if(typeof ResizeObserver!=='undefined' && main){resizeObserver=new ResizeObserver(refresh);resizeObserver.observe(main);}
  return()=>{cancelled=true;window.removeEventListener('load',refresh);resizeObserver?.disconnect();ctx?.revert();};
},[animationKey]);
 const scrollTo=id=>{setMenu(false);document.querySelector(id)?.scrollIntoView({behavior:'smooth'})};
 return <><div className="cursor" ref={cursor}/><div className="cursor-dot" ref={dot}/><div className="scroll-progress" ref={progress}/><div className="ambient-orb orb-one"/><div className="ambient-orb orb-two"/>
 <header className="nav"><Link className="brand" to="/" onClick={()=>setMenu(false)}>IR<span>✦</span></Link><button className="menu-btn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button><nav className={menu?'nav-links open':'nav-links'}><button onClick={()=>scrollTo('#projects')}>Projects</button><button onClick={()=>scrollTo('#experience')}>Experience</button><button onClick={()=>scrollTo('#skills')}>Skills</button><button onClick={()=>scrollTo('#contact')}>Contact</button><Link className="admin-link" to="/admin">Admin ↗</Link></nav></header>{children}<footer><span>IKRAMULLAH'S WORLD</span><span>BUILT WITH <b>✦</b> CODE + CURIOSITY</span><span>© {new Date().getFullYear()}</span></footer></>;
}
