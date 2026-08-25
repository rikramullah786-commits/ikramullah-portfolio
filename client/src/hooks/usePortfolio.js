import {useCallback,useEffect,useState} from 'react';
import {api} from '../api/client';
import {normalizePortfolio} from '../data/portfolio';
const EMPTY={profile:{},skills:[],experience:[],projects:[],certificates:[]};
export default function usePortfolio(){
 const [data,setData]=useState(EMPTY),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const refresh=useCallback(async()=>{setLoading(true);try{const remote=await api('/api/portfolio',{timeout:12000});setData(normalizePortfolio(remote));setError('')}catch(e){setData(EMPTY);setError(e.message||'Unable to load portfolio')}finally{setLoading(false)}},[]);
 useEffect(()=>{refresh()},[refresh]); return {data,loading,error,refresh};
}
