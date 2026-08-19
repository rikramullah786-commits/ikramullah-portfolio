import React,{useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {api} from '../api/client';

export default function GuestbookSection(){
  const [name,setName]=useState(''),[contact,setContact]=useState(''),[msg,setMsg]=useState('');
  const submit=async e=>{
    e.preventDefault();
    if(!name.trim()) return setMsg('Please enter your name.');
    try{
      await api('/api/guestbook',{method:'POST',body:JSON.stringify({name:name.trim(),contact:contact.trim()})});
      setName('');setContact('');setMsg('Signed. Thanks for visiting ✦');
    }catch(e){setMsg(e.message)}
  };
  return <section className="gallery section reveal">
    <div className="gallery-note">
      <p className="eyebrow">05 — VISITOR GALLERY</p>
      <h2>Leave your <em>mark.</em></h2>
      <p>A tiny interactive guestbook for people who explore the world.</p>
    </div>
    <form className="guestbook" onSubmit={submit}>
      <label>Your name</label>
      <div><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. curious explorer" maxLength={40}/></div>
      <label>Contact</label>
      <div><input value={contact} onChange={e=>setContact(e.target.value)} placeholder="email / phone / LinkedIn" maxLength={120}/><button><ArrowUpRight size={20}/></button></div>
      <small>{msg||'No account. Just leave your name and contact.'}</small>
    </form>
  </section>
}
