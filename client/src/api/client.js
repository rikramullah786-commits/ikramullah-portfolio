const API_BASE = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path='') => {
  const value = String(path || '');
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_BASE}${value.startsWith('/') ? value : `/${value}`}`;
};

export const assetUrl = (value='') => apiUrl(value);

export async function api(url, options={}) {
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) headers.set('Content-Type','application/json');
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), Number(options.timeout||10000));
  try {
    const {timeout,...fetchOptions}=options;
    const res = await fetch(apiUrl(url),{...fetchOptions,headers,signal:fetchOptions.signal||controller.signal});
    const text = await res.text();
    let body={}; try { body=text?JSON.parse(text):{}; } catch { body={message:text}; }
    if(!res.ok) throw new Error(body.message || `Request failed (${res.status})`);
    return body;
  }catch(e){
    if(e.name==='AbortError') throw new Error('API request timed out');
    if(e instanceof TypeError) throw new Error('API server is unavailable');
    throw e;
  }finally{clearTimeout(timer)}
}
export const authHeaders = () => ({Authorization:`Bearer ${localStorage.getItem('portfolio_token')||''}`});
