(()=>{"use strict";var e={834:(e,t,o)=>{o.r(t),o.d(t,{Project:()=>d});const d=e=>{let t=e.name||"",o=e.id||"",d={};const a=e=>!d.hasOwnProperty(e),n=()=>{let e=Math.floor(Math.random()*Math.floor(255));for(;!a(e);)e=Math.floor(Math.random()*Math.floor(255));return e};return{setName:e=>{t=e},setID:e=>{o=e},getName:()=>t,getID:()=>o,addTask:e=>{const t=n();e.setID(t),(e=>{d[e.getID()]=e})(e)},removeTask:e=>{(e=>{a(e)&&delete d[e]})(e)},createID:n,getTasks:()=>d,updateDetails:e=>{if(e.id){const t=d[e.id];t.setDetails(e.details),t.setDate(e.date)}}}}}},t={};function o(d){if(t[d])return t[d].exports;var a=t[d]={exports:{}};return e[d](a,a.exports,o),a.exports}o.d=(e,t)=>{for(var d in t)o.o(t,d)&&!o.o(e,d)&&Object.defineProperty(e,d,{enumerable:!0,get:t[d]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e=o(834);const t=e=>{let t=[];return{addHandler:e=>{t.push(e)},removeHandler:e=>{const o=t.indexOf(e);t.splice(o,1)},fire:e=>{t.forEach((t=>{t(e)}))},myName:e||""}},d=(()=>{let e=[];const o=t=>e.filter((e=>e.myName==t))[0];return{publish:(d,a)=>{let n=o(d);n||(n=t(d),console.log(d),e.push(n)),n.fire(a)},subscribe:(d,a)=>{let n=o(d);n||(n=t(d),e.push(n)),n.addHandler(a)}}})(),{Project:a}=o(834);let n=(0,e.Project)("main",0);const s=n.createID(),l=(0,e.Project)({name:"chris",id:s}),r={id:l.getID(),name:l.getName()};(()=>{const e=e=>{const t=document.querySelector("#ul-sidebar-projects"),o=document.createElement("li");o.className="sidebar-project-list_item  solid-top-border",o.id=e.id;const d=document.createElement("p");d.className="center-list-item",d.innerText=e.name,o.append(d),t.append(o)};d.subscribe("projectAdded",(t=>{e(t.project)}));const t=()=>{document.querySelectorAll(".sidebar-project-list_item").forEach((e=>{e.addEventListener("click",(e=>{d.publish("projectSelected",{project:p.getTasks()})}))}))};d.subscribe("projectAdded",(e=>{t()}))})(),(()=>{const e=document.querySelector("#display-todos"),t="material-icons",o=e=>{const t=e.details||"",o=`todo-item-text ${e.element}-details`,a=document.createElement("div"),n=document.createElement(e.element);return a.setAttribute("id",`details-${e.element}-${e.id}`),n.setAttribute("id",`${e.element}-${e.id}`),"textarea"===e.element&&n.setAttribute("maxlength",120),a.className="flex-content todo-details collapsible-hidden",n.className=o,n.textContent=t,a.append(n),d.subscribe("detailsUpdated",(e=>{n.textContent=e.details})),a},a=()=>{const e=e=>"flex-content todo-details collapsible-hidden"==e?"flex-content todo-details":"flex-content todo-details collapsible-hidden",o=o=>{const d=(o.target.className===t?o.target.parentElement.id:o.target.id).slice(12);console.log(d);const a=document.querySelector(`#details-p-${d}`);a.className=e(a.className)},a=o=>{const a=(o.target.className===t?o.target.parentElement.id:o.target.id).slice(7);console.log(a);const n=`#create-${a}`,s="#details-textarea-"+a,l=`#textarea-${a}`,r=`#dateInput-${a}`,c=document.querySelector(n),i=document.querySelector(s),u=document.querySelector(l),m=document.querySelector(r);u.addEventListener("keydown",(e=>{c.disabled=!e.target.value})),u.value&&"flex-content todo-details"===i.className&&d.publish("updateDetails",{id:a,details:u.value,date:m.value}),m.disabled=!m.disabled,i.className=e(i.className)};return{initEvents:e=>{const t=e||"";(e=>{document.querySelector(`#expand_more-${e}`).addEventListener("click",o)})(t),(e=>{document.querySelector(`#button-${e}`).addEventListener("click",(t=>(e=>{const t=`grid-${e}`,o=document.querySelector("#display-todos");let a=o.childNodes;Array.from(a).forEach((e=>{if(console.log(e),e.id==t){o.removeChild(e);const t=e.id;d.publish("removedTaskFromView",{id:t})}}))})(e)))})(t),(e=>{console.log(e),document.querySelector(`#create-${e}`).addEventListener("click",a)})(t)}}};d.subscribe("addTasktoView",(d=>{(d=>{const n=document.createElement("div"),s=document.createElement("div");n.setAttribute("id",`grid-${d.id}`),s.setAttribute("id",d.id),n.className="grid grid-todos",s.className="flex-content todo-item",s.append(((e,o)=>{const d=e||"",a=document.createElement("div"),n=document.createElement("button"),s=document.createElement("i"),l=document.createElement("span");return a.className="flex-content",n.className="check-button-todo",s.className=t,l.className="todo-item-text",l.innerText=d,s.innerText="check_circle_outline",n.setAttribute("id",`button-${o}`),s.setAttribute("id",`check-mark-${o}`),n.append(s),a.append(n,l),a})(d.title,d.id),((e,t)=>{const o=document.createElement("div"),d=document.createElement("input"),a=`dateInput-${e}`;return d.className="solid-bottom-border new-task-todo-input",d.setAttribute("id",a),d.setAttribute("value",t),d.setAttribute("type","date"),d.disabled=!0,o.append(d),o})(d.id,d.date),(e=>{const o=document.createElement("div");return o.className="flex-content todo-item-options",["expand_more","create"].forEach((d=>{const a=document.createElement("button"),n=document.createElement("i");a.id=`${d}-${e}`,a.className=d+" icon-button todo-item-button todo-item-option",n.className=t,n.textContent=d,a.append(n),o.append(a)})),o})(d.id)),n.append(s,o({element:"p",id:d.id,details:d.details}),o({element:"textarea",id:d.id,details:d.details})),e.append(n),a().initEvents(d.id)})(d)}))})(),(()=>{const e=e=>{document.querySelector(e.input).addEventListener("keydown",(t=>{(e=>{((e,t)=>{document.querySelector(t).disabled=e})(!(e=>!!document.querySelector(e).value)(e.input),e.button)})(e)}))};e({input:"#new-task-input",button:"#new-task-todo-button"}),document.querySelector("#new-task-todo-button").addEventListener("click",(e=>{document.querySelector(".modal").style.display="block"})),(()=>{const t=()=>document.querySelector("#modal-text-input").value,o=()=>{document.querySelector(".modal").style.display="none",document.querySelector("#modal-text-input").value=""};e({input:"#modal-text-input",button:"#confirm-modal"}),document.querySelector("#modal-text-input").addEventListener("keydown",(e=>{(()=>{const e=document.querySelector("#character-count"),o=120-t().length;e.textContent=o,e.style.color=o<=0?"var(--menuGold)":"var(--ultrav)"})()})),document.querySelector("#confirm-modal").addEventListener("click",(e=>(()=>{const e=document.querySelector("#new-task-input").value,a=t(),n=document.querySelector("#new-task-date").value;o(),d.publish("createTask",{title:e,details:a,date:n})})())),document.querySelector("#close-modal").addEventListener("click",(e=>{o()}))})()})(),d.subscribe("projectSelected",(e=>{const t=e.project;(()=>{const e=document.querySelector("#display-todos");for(;e.firstChild;)e.removeChild(e.firstChild)})();for(let e in t){const o=t[e].getTitle(),a=t[e].getDetails(),n=t[e].getID();d.publish("addTasktoView",{title:o,details:a,id:n})}})),d.publish("projectAdded",{project:r}),d.subscribe("createTask",(e=>{const t=(e=>{let t=e.title||"",o=e.details||"",d=e.id||0,a=e.date||"";return{setTitle:e=>{t=e},setDetails:e=>{o=e},setID:e=>{d=e},setDate:e=>{a=e},getTitle:()=>t,getDetails:()=>o,getID:()=>d,getDate:()=>a}})(e);d.publish("addTask",{task:t})})),d.subscribe("updateDetails",(e=>{const t=n.getTasks(),o=e.details,a=e.date,s=t[e.id];s.setDetails(o),s.setDate(a),d.publish("detailsUpdated",{details:o,date:a})})),d.subscribe("addTask",(e=>{const t=e.task;n.addTask(t);const o=t.getTitle(),a=t.getDetails(),s=t.getID(),l=t.getDate();d.publish("addTasktoView",{title:o,details:a,id:s,date:l})})),d.subscribe("removedTaskFromView",(e=>{console.log("removeTask");const t=e.id||"";n.removeTask(t),console.log(n.getTasks())}))})()})();