import { eventAggregator } from "./EventHandler";

const { Project } = require("../objects/project");

const SideBarView = () => {    

    const render = (project) => {
        const RENDER_ID = "#ul-sidebar-projects";
        const RENDER_AREA = document.querySelector(RENDER_ID);
        
        const LI_CLASSNAME = "sidebar-project-list_item  solid-top-border";
        const P_CLASSNAME = "center-list-item";

        const li = document.createElement('li');
        li.className = LI_CLASSNAME;
        li.id = project.id;

        const p = document.createElement('p');
        p.className = P_CLASSNAME;
        p.innerText = project.name;

        li.append(p);

        RENDER_AREA.append(li);
    };

    eventAggregator.subscribe("projectAdded", eventArgs => {
        render(eventArgs.project);
    })
   
    return {render};
};

const SideBarProjEvents = () => {
    
    const getProjectNodes = () => {
        
        const SELECTOR_CLASSNAME = ".sidebar-project-list_item";

        const projNodes = document.querySelectorAll(SELECTOR_CLASSNAME);
        return projNodes;
    };

    const updateProjListener = (projArray) => {
        
        const myProjs  = projArray;
        let PROJ = Project("main", 0);

        myProjs.forEach(project => {
            project.addEventListener('click', e => {
                console.log(e);
                
                const id = PROJ.createID();
                const p = Project(project.textContent, id);
                
                project.setAttribute("id", id);
                PROJ.addTask(id, p);

                eventAggregator.publish("projectSelected", {project: p.getTasks()});
            });
        });
    };

    const update = () => {
        updateProjListener(getProjectNodes());
    };

    return {update};
};
export {SideBarView, SideBarProjEvents};