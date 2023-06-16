import{useEffect as O,useState as g}from"react";var q=r=>r.replace(/\/$/g,""),T=r=>r.startsWith("/")?r:`/${r}`;var E=class{constructor(s,e){this.baseUrl=q(s||"/"),this.headers=()=>({"Content-Type":"application/json",Accept:"application/json",...e==null?void 0:e()})}async request(s,e={}){var f;let y={method:e.method||"GET",body:JSON.stringify(e.body||{}),headers:{"Content-Type":"application/json",Accept:"application/json",...(f=this.headers)==null?void 0:f.call(this),...e==null?void 0:e.headers}},d=null,a=null,i,l,u=this.baseUrl+s;Object.keys(e.params||{}).length>0&&(u+=new URLSearchParams(e.params).toString());try{i=await fetch(u,y)}catch(t){return console.error(t),a={status:0,fetchResponse:null,data:null},{data:d,error:a}}let h=await i.text();try{l=h?JSON.parse(h):null}catch(t){l=h}return i.ok?d=l:a={status:i.status,fetchResponse:i,data:l},{data:d,error:a}}useQuery(s,e){let[y,d]=g(null),[a,i]=g(null),[l,u]=g(!0),h=async(f={})=>{var c,m,R,S;u(!0),(c=e==null?void 0:e.onLoadingStart)==null||c.call(e);let{data:t,error:n}=await this.request(T(s),{headers:e==null?void 0:e.headers,method:e==null?void 0:e.method,params:f});return u(!1),(m=e==null?void 0:e.onLoadingEnd)==null||m.call(e),n?(i(n),(R=e==null?void 0:e.onError)==null||R.call(e,{status:n.status,fetchResponse:n.fetchResponse,data:t})):t?(d(t),(S=e==null?void 0:e.onSuccess)==null||S.call(e,t)):console.log("No data or error returned from request!"),{data:t,error:n}};return O(()=>{h(e==null?void 0:e.params)},[]),{data:y,error:a,refetch:h,isLoading:l,isError:!!a}}useMutation(s,e){let[y,d]=g(null),[a,i]=g(null),[l,u]=g(!0);return{data:y,error:a,mutate:async(f,t)=>{var m,R,S,U;u(!0),(m=e==null?void 0:e.onLoadingStart)==null||m.call(e);let{data:n,error:c}=await this.request(T(s),{body:f,headers:e==null?void 0:e.headers,method:(e==null?void 0:e.method)||"POST",params:t});return u(!1),(R=e==null?void 0:e.onLoadingEnd)==null||R.call(e),c?(i(c),(S=e==null?void 0:e.onError)==null||S.call(e,{status:c.status,fetchResponse:c.fetchResponse,data:n})):n?(d(n),(U=e==null?void 0:e.onSuccess)==null||U.call(e,n)):console.log("No data or error returned from request!"),{data:n,error:c}},isLoading:l,isError:!!a}}},w=r=>new E(r==null?void 0:r.baseUrl,r==null?void 0:r.headers);export{w as createFetcher};
