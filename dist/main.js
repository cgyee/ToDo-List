(()=>{"use strict";var e={834:(e,t,o)=>{o.r(t),o.d(t,{Project:()=>a});const a=e=>{let t=e.name||"",o=e.id||"",a={};const d=e=>!a.hasOwnProperty(e),n=()=>{let e=Math.floor(Math.random()*Math.floor(255));for(;!d(e);)e=Math.floor(Math.random()*Math.floor(255));return e};return{setName:e=>{t=e},setID:e=>{o=e},getName:()=>t,getID:()=>o,addTask:e=>{const t=n();e.setID(t),(e=>{a[e.getID()]=e})(e)},removeTask:e=>{(e=>{d(e)&&delete a[e]})(e)},createID:n,getTasks:()=>a}}}},t={};function o(a){if(t[a])return t[a].exports;var d=t[a]={exports:{}};return e[a](d,d.exports,o),d.exports}o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=o(834);const t=e=>{let t=[];return{addHandler:e=>{t.push(e)},removeHandler:e=>{const o=t.indexOf(e);t.splice(o,1)},fire:e=>{t.forEach((t=>{t(e)}))},myName:e||""}},a=(()=>{let e=[];const o=t=>e.filter((e=>e.myName==t))[0];return{publish:(a,d)=>{let n=o(a);n||(n=t(a),console.log(a),e.push(n)),n.fire(d)},subscribe:(a,d)=>{let n=o(a);n||(n=t(a),e.push(n)),n.addHandler(d)}}})(),{Project:d}=o(834);let n=(0,e.Project)("main",0);const l=n.createID(),r=(0,e.Project)({name:"chris",id:l}),c={id:r.getID(),name:r.getName()};(()=>{const e=e=>{const t=document.querySelector("#ul-sidebar-projects"),o=document.createElement("li");o.className="sidebar-project-list_item  solid-top-border",o.id=e.id;const a=document.createElement("p");a.className="center-list-item",a.innerText=e.name,o.append(a),t.append(o)};a.subscribe("projectAdded",(t=>{e(t.project)}));const t=()=>{document.querySelectorAll(".sidebar-project-list_item").forEach((e=>{e.addEventListener("click",(e=>{a.publish("projectSelected",{project:p.getTasks()})}))}))};a.subscribe("projectAdded",(e=>{t()}))})(),(()=>{const e=document.querySelector("#display-todos"),t="material-icons",o=e=>{const t=e.details||"",o=`todo-item-text ${e.element}-details`,d=document.createElement("div"),n=document.createElement(e.element);return d.setAttribute("id",`details-${e.element}-${e.id}`),n.setAttribute("id",`${e.element}-${e.id}`),d.className="flex-content todo-details collapsible-hidden",n.className=o,n.textContent=t,d.append(n),a.subscribe("detailsUpdated",(e=>{n.textContent=e.details})),d},d=()=>{const e=e=>"flex-content todo-details collapsible-hidden"==e?"flex-content todo-details":"flex-content todo-details collapsible-hidden",o=o=>{const a=(o.target.className===t?o.target.parentElement.id:o.target.id).slice(12),d=document.querySelector(`#details-p-${a}`);d.className=e(d.className)},d=o=>{const d=(o.target.className===t?o.target.parentElement.id:o.target.id).slice(7),n=`#create-${d}`,l="#details-textarea-"+d,r=`#textarea-${d}`,c=`#dateInput-${d}`,s=document.querySelector(n),i=document.querySelector(l),u=document.querySelector(r),m=document.querySelector(c);u.addEventListener("keydown",(e=>{s.disabled=!e.target.value})),u.value&&"flex-content todo-details"===i.className&&a.publish("updateDetails",{id:d,details:u.value}),m.disabled=!m.disabled,i.className=e(i.className)},n=e=>{const t="material-icons"===e.target.className?e.target.id.slice("check_mark-".length+1):e.target.id.slice("button-".length+1),o=document.querySelector(`#grid-${t}`);let a=o.firstChild;for(;a.id!=t;)a=a.nextSibling;o.removeChild(a)};return{initEvents:()=>{[".expand_more"].forEach((e=>{document.querySelectorAll(e).forEach((e=>{e.addEventListener("click",o)}))})),[".check-button-todo"].forEach((e=>{document.querySelectorAll(e).forEach((e=>{e.addEventListener("click",n)}))})),[".create"].forEach((e=>{document.querySelectorAll(e).forEach((e=>{e.addEventListener("click",d)}))}))}}};a.subscribe("addTasktoView",(a=>{(a=>{const n=document.createElement("div"),l=document.createElement("div");n.setAttribute("id",`grid-${a.id}`),l.setAttribute("id",a.id),n.className="grid grid-todos",l.className="flex-content todo-item",l.append(((e,o)=>{const a=e||"",d=document.createElement("div"),n=document.createElement("button"),l=document.createElement("i"),r=document.createElement("span");return d.className="flex-content",n.className="check-button-todo",l.className=t,r.className="todo-item-text",r.innerText=a,l.innerText="check_circle_outline",n.setAttribute("id",`button-${o}`),l.setAttribute("id",`check-mark-${o}`),n.append(l),d.append(n,r),d})(a.title,a.id),((e,t)=>{const o=document.createElement("div"),a=document.createElement("input"),d=`dateInput-${e}`;return a.className="solid-bottom-border new-task-todo-input",a.setAttribute("id",d),a.setAttribute("placeholder",t),a.setAttribute("type","date"),a.disabled=!0,o.append(a),o})(a.id,a.date),(e=>{const o=document.createElement("div");return o.className="flex-content todo-item-options",["expand_more","create"].forEach((a=>{const d=document.createElement("button"),n=document.createElement("i");d.id=`${a}-${e}`,d.className=a+" icon-button todo-item-button todo-item-option",n.className=t,n.textContent=a,d.append(n),o.append(d)})),o})(a.id)),n.append(l,o({element:"p",id:a.id,details:a.details}),o({element:"textarea",id:a.id,details:a.details})),e.append(n),d().initEvents()})(a)}))})(),(()=>{const e=e=>{document.querySelector(e.input).addEventListener("keydown",(t=>{(e=>{((e,t)=>{document.querySelector(t).disabled=e})(!(e=>!!document.querySelector(e).value)(e.input),e.button)})(e)}))};e({input:"#new-task-input",button:"#new-task-todo-button"}),document.querySelector("#new-task-todo-button").addEventListener("click",(e=>{document.querySelector(".modal").style.display="block"})),(()=>{const t=()=>document.querySelector("#modal-text-input").value,o=()=>{document.querySelector(".modal").style.display="none",document.querySelector("#modal-text-input").value=""};e({input:"#modal-text-input",button:"#confirm-modal"}),document.querySelector("#modal-text-input").addEventListener("keydown",(e=>{(()=>{const e=document.querySelector("#character-count"),o=120-t().length;console.log(o),e.textContent=o,e.style.color=o<=0?"var(--menuGolde)":"var(--ultrav)"})()})),document.querySelector("#confirm-modal").addEventListener("click",(e=>(()=>{const e=document.querySelector("#new-task-input").value,d=t(),n=document.querySelector("#new-task-date").value;o(),a.publish("createTask",{title:e,details:d,date:n})})())),document.querySelector("#close-modal").addEventListener("click",(e=>{o()}))})()})(),a.subscribe("projectSelected",(e=>{const t=e.project;(()=>{const e=document.querySelector("#display-todos");for(;e.firstChild;)e.removeChild(e.firstChild)})();for(let e in t){const o=t[e].getTitle(),d=t[e].getDetails(),n=t[e].getID();a.publish("addTasktoView",{title:o,details:d,id:n})}})),a.publish("projectAdded",{project:c}),a.subscribe("createTask",(e=>{const t=(e=>{let t=e.title||"",o=e.details||"",a=e.id||0,d=e.date||"";return{setTitle:e=>{t=e},setDetails:e=>{o=e},setID:e=>{a=e},setDate:e=>{d=e},getTitle:()=>t,getDetails:()=>o,getID:()=>a,getDate:()=>d}})(e);a.publish("addTask",{task:t})})),a.subscribe("updateDetails",(e=>{const t=n.getTasks(),o=e.details,d=e.id;console.log(o),t[d].setDetails({details:o}),a.publish("detailsUpdated",{details:e.details})})),a.subscribe("addTask",(e=>{const t=e.task;n.addTask(t);const o=t.getTitle(),d=t.getDetails(),l=t.getID(),r=t.getDate();a.publish("addTasktoView",{title:o,details:d,id:l,date:r})}))})()})();