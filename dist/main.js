(()=>{"use strict";var e={834:(e,t,r)=>{r.r(t),r.d(t,{Project:()=>o});const o=(e,t)=>{let r=e,o=t,n={},l=[];return{setName:e=>{r=e},setID:e=>{o=e},getName:()=>r,getID:()=>o,addTask:(e,t)=>!!(e=>l.every((t=>t!=e)))(e)&&((e=>{l.push(e)})(e),((e,t)=>{n[e]=t})(e,t),!0),removeTask:e=>{(e=>{-1!=l.indexOf(e)&&(l=l.filter((t=>t!=e)))})(e),(e=>{delete n[e]})(e)}}}}},t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const{Project:e}=r(834),t=(0,r(834).Project)("Chris",1);console.log(t.getName()),console.log(t.getID());const o=((e,t)=>{let r=e,o=t;return{renderArea:()=>"#ul-sidebar-projects",render:()=>{const e=document.createElement("li");e.className="sidebar-project-list_item  solid-top-border",e.id=o;const t=document.createElement("p");return t.className="center-list-item",t.innerText=r,e.append(t),e}}})(t.getName(),t.getID());document.querySelector(o.renderArea()).append(o.render()),document.querySelectorAll(".sidebar-project-list_item").forEach((e=>{e.addEventListener("click",(e=>{console.log(e.target.parentElement.id||e.target.id)}))}))})()})();