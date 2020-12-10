import { eventAggregator } from "./EventHandler";

const { Project } = require("../objects/project");

const SideBarView = () => {

    const render = (project) => {
        console.log("render");
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
        console.log("sub1");
        console.log(eventArgs);
        render(eventArgs.project);
    });

    const SideBarProjEvents = (() => {
    
        const getProjectNodes = () => {
            
            const SELECTOR_CLASSNAME = ".sidebar-project-list_item";
    
            const projNodes = document.querySelectorAll(SELECTOR_CLASSNAME);
            return projNodes;
        };
    
        const updateProjectListener = (projects) => {
            
            projects.forEach(project => {
                project.addEventListener('click', e => {
                    console.log(e);
    
                    eventAggregator.publish("projectSelected", {project: p.getTasks()});
                });
            });
        };
    
        const update = () => {
            updateProjectListener(getProjectNodes());
        };
    
        return {update};
    })();

    eventAggregator.subscribe("projectAdded", eventArgs => {
        console.log("sub2");
        SideBarProjEvents.update();});
   
    return {render};
};
export {SideBarView};