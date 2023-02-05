import{k as N,u as C}from"./app-be3d523c.js";import{c as $,h as v,j as n,Y as G,C as F,$ as f}from"./framework-11534bf9.js";var m=$({name:"FontIcon",props:{icon:{type:String,default:""},color:{type:String,default:""},size:{type:[String,Number],default:""}},setup(t){const p=v(()=>{const c={};return t.color&&(c.color=t.color),t.size&&(c["font-size"]=Number.isNaN(Number(t.size))?t.size:`${t.size}px`),Object.keys(c).length?c:null});return()=>t.icon?n("span",{key:t.icon,class:["font-icon icon","",t.icon.includes(" ")?t.icon:`iconfont icon-${t.icon}`],style:p.value}):null}}),j=$({name:"Catalog",props:{base:{type:String,default:""},level:{type:Number,default:3},titleGetter:{type:Function,default:t=>t.title},iconGetter:{type:Function,default:t=>t.icon},orderGetter:{type:Function,default:t=>t.order||0},shouldIndex:{type:Function,default:t=>t.index!==!1}},setup(t){const p=N({"/":{title:"Catalog"}}),c=G(),b=F(),y=C(),k=()=>{const o=t.base||c.path.replace(/\/[^/]+$/,"/"),u=b.getRoutes(),d=[];return u.filter(({meta:l,path:e})=>{if(!e.startsWith(o)||e===o)return!1;if(o==="/"){const r=Object.keys(y.value.locales).filter(i=>i!=="/");if(e==="/404.html"||r.some(i=>e.startsWith(i)))return!1}return(e.endsWith(".html")&&!e.endsWith("/index.html")||e.endsWith("/"))&&t.shouldIndex(l)}).map(({path:l,meta:e})=>{const r=l.substring(o.length).split("/").length;return{title:t.titleGetter(e),icon:t.iconGetter(e),base:l.replace(/\/[^/]+\/?$/,"/"),order:t.orderGetter(e),level:l.endsWith("/")?r-1:r,path:l}}).filter(({title:l,level:e})=>e<=t.level||!l).sort((l,e)=>l.level-e.level||(l.path.endsWith("/index.html")?-1:e.path.endsWith("/index.html")?1:l.order===null?e.order===null?l.title.localeCompare(e.title):e.order:e.order===null?l.order:l.order>0?e.order>0?l.order-e.order:-1:e.order<0?l.order-e.order:1)).forEach(l=>{var e;const{base:r,level:i}=l;switch(i){case 1:d.push(l);break;case 2:{const s=d.find(a=>a.path===r);s&&(s.children??(s.children=[])).push(l);break}default:{const s=d.find(a=>a.path===r.replace(/\/[^/]+\/$/,"/"));if(s){const a=(e=s.children)==null?void 0:e.find(h=>h.path===r);a&&(a.children??(a.children=[])).push(l)}}}}),d},x=v(()=>k());return()=>n("div",{class:"catalog-wrapper"},[n("h2",{class:"main-title"},p.value.title),...x.value.map(({children:o=[],icon:u,path:d,title:l},e)=>[n("h3",{id:l,class:["child-title",{"has-children":o.length}]},[n("a",{href:`#${l}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:d},()=>[u?n(m,{icon:u}):null,`${e+1}. ${l||"Unknown"}`])]),o.length?n("ul",{class:"child-catalog-wrapper"},o.map(({children:r=[],icon:i,path:s,title:a},h)=>n("li",{class:"child-catalog-item"},[n("div",{class:["sub-title",{"has-children":r.length}]},[n("a",{href:`#${a}`,class:"header-anchor"},"#"),n(f,{class:"catalog-title",to:s},()=>[i?n(m,{icon:i}):null,`${e+1}.${h+1} ${a||"Unknown"}`])]),r.length?n("div",{class:"sub-catalog-wrapper"},r.map(({icon:g,path:W,title:w},z)=>n(f,{class:"sub-catalog-item",to:W},()=>[g?n(m,{icon:g}):null,`${e+1}.${h+1}.${z+1} ${w||"Unknown"}`]))):null]))):null])])}});export{j as default};
