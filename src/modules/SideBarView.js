import { eventAggregator } from "./EventHandler";

const { Project } = require("../objects/project");

const SideBarView = () => {

    const render = (project) => {
        const RENDER_ID = "#ul-sidebar-projects";
        const RENDER_AREA = document.querySelector(RENDER_ID);
        
        const LI_CLASSNAME = "sidebar-project-list_item  solid-top-border";
        const DIV_CLASSNAME = "flex-content project-edit"
        const INPUT_CLASSNAME = "center-list-item";
        const I_CLASSNAME = "material-icons";

        const li = document.createElement('li');
        const div =document.createElement('div');
        const input = document.createElement('input');
        const i =  document.createElement('i');


        li.className = LI_CLASSNAME;
        div.className = DIV_CLASSNAME;
        input.className = INPUT_CLASSNAME;
        i.className = I_CLASSNAME;

        li.setAttribute("id", `project-${project.id}`);
        input.setAttribute("id", `p-input-${project.id}`);
        input.setAttribute("maxlength","16");
        i.setAttribute("id", `p-create-${project.id}`);

        input.value = project.name;
        input.disabled = true;
        i.textContent = "create";

        div.append(input, i);
        li.append(div);

        RENDER_AREA.append(li);

        SideBarProjEvents.initEvents(project.id);
    };

    eventAggregator.subscribe("projectAdded", eventArgs => {
        render(eventArgs.project);
    });

    const SideBarProjEvents = (() => {
    
        const getProjectNodes = () => {
            
            const SELECTOR_CLASSNAME = ".sidebar-project-list_item";
    
            const projNodes = document.querySelectorAll(SELECTOR_CLASSNAME);
            return projNodes;
        };
    
        const updateProjectListener = (projects) => {
            //Todo
            // projects.forEach(project => {
            //     project.addEventListener('click', e => {
            //         eventAggregator.publish("projectSelected", {});
            //     });
            // });
        };
    
        const update = () => {
            updateProjectListener(getProjectNodes());
        };

        const enableInput = (id) => {
            const input = document.querySelector(`#p-input-${id}`);    
            input.disabled = input.disabled ? false : true;
            input.className = input.disabled ? "center-list-item" : "center-list-item center-list-item-enabled";
        }
        
        const enableButton = (e, id) => {
            const button = document.querySelector(`#p-create-${id}`);
            button.disabled = e.target.value ? false : true;

            if(!button.disabled) {
                const name = e.target.value;
                eventAggregator.publish("updateProjectName", {name, id});
            }
        }

        const inputEvent = (id) => {
            const input = document.querySelector(`#p-input-${id}`);
            input.addEventListener('keydown', e=> enableButton(e, id));
        }

        const editEvent = (id) => {
            const button = document.querySelector(`#p-create-${id}`);
            console.log(button);
            button.addEventListener('click', e=> enableInput(id));
        }

        const initEvents = (id) => {
            console.log("initEvents", id);
            inputEvent(id);
            editEvent(id);
        }
    
        return {update, initEvents};
    })();

    eventAggregator.subscribe("projectAdded", eventArgs => {
        SideBarProjEvents.update();});
   
    return {render};
};
export {SideBarView};