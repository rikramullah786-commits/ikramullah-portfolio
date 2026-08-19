import {useCallback,useEffect,useState} from 'react';
import {api} from '../api/client';
import {FALLBACK,normalizePortfolio} from '../data/portfolio';

export default function usePortfolio(){
 const [data,setData]=useState(()=>normalizePortfolio(FALLBACK));
 const [loading,setLoading]=useState(true);
 const [error,setError]=useState('');
 const refresh=useCallback(async()=>{
   setLoading(true);
   try{
     const remote=await api('/api/portfolio',{timeout:3500});
     setData(normalizePortfolio(remote));
     setError('');
   }catch(e){
     setData(normalizePortfolio(FALLBACK));
     setError(e.message||'Using local portfolio data');
   }finally{setLoading(false)}
 },[]);
 useEffect(()=>{refresh()},[refresh]);
 return {data,loading,error,refresh};
}
