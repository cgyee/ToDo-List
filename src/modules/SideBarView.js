import { eventAggregator } from "./EventHandler";

const { Project } = require("../objects/project");

const SideBarView = () => {

    const projectNameCollapsible = (specs) => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const id = specs.id || 2048;
        const name = specs.name || "default";

        div.className = "flex-content project-edit collapsible-hidden";
        input.className = "center-list-item ";

        div.setAttribute("id", `p-collapsible-${id}`);
        input.setAttribute("id", `p-input-${id}`);
        input.value = name;
        div.append(input);

        return div;
    }

    const render = (project) => {
        const RENDER_ID = "#ul-sidebar-projects";
        const RENDER_AREA = document.querySelector(RENDER_ID);
        
        const DIV_CONTAINER_CLASSNAME = "flex-content f-column"
        const LI_CLASSNAME = "sidebar-project-list_item  solid-top-border";
        const DIV_CLASSNAME = "flex-content project-edit";
        const BUTTON_CLASSNAME = "center-list-item";
        const I_CLASSNAME = "material-icons icon";

        const div_container = document.createElement('div');
        const li = document.createElement('li');
        const div = document.createElement('div');
        const button = document.createElement('button');
        const i_check = document.createElement('i');
        const i_edit =  document.createElement('i');


        div_container.className = DIV_CONTAINER_CLASSNAME;
        li.className = LI_CLASSNAME;
        div.className = DIV_CLASSNAME;
        button.className = BUTTON_CLASSNAME;
        i_check.className = I_CLASSNAME;
        i_edit.className = I_CLASSNAME;

        li.setAttribute("id", `project-${project.id}`);
        button.setAttribute("id", `p-button-${project.id}`);
        i_check.setAttribute("id", `p-check-${project.id}`);
        i_edit.setAttribute("id", `p-create-${project.id}`);
        i_edit.disabled = false;

        button.textContent = project.name;
        i_check.textContent = "check_circle_outline";
        i_edit.textContent = "create";

        const name = project.name;
        const id = project.id;
        const collapsible = projectNameCollapsible({name, id});

        div.append(i_check, button, i_edit);
        div_container.append(div, collapsible);
        li.append(div_container);

        RENDER_AREA.append(li);

        SideBarProjEvents.initEvents(project.id);
    };

    eventAggregator.subscribe("addProjectToView", eventArgs => {
        render(eventArgs);
    });

    const SideBarProjEvents = (() => {

        const addProjectEvent =(() =>{
            const inputID = `#new-project-input`;
            const buttonID = `#new-project-button`;

            const input = document.querySelector(inputID);
            const button = document.querySelector(buttonID);

            input.addEventListener('keyup', e=> {
                button.disabled = e.target.value ? false : true;
            });

            button.addEventListener('click', e=> {
                if(!e.target.disabled) {
                    const name = input.value;
                    eventAggregator.publish("createNewProject", {name});
                }
            });

        })();

        const enableInput = (e, id) => {
            const disabled = e.target.disabled ;
            if(!disabled) {
                const div = document.querySelector(`#p-collapsible-${id}`);
                const input = document.querySelector(`#p-input-${id}`);
                div.className = div.className === "flex-content project-edit collapsible-hidden" ? "flex-content project-edit" : "flex-content project-edit collapsible-hidden";    
                input.className = input.className === "center-list-item" ? "center-list-item" : "center-list-item center-list-item-enabled";
            }
            
        };
        
        const enableButton = (e, id) => {
            const button = document.querySelector(`#p-create-${id}`);
            button.disabled = e.target.value ? false : true;

            if(!button.disabled) {
                const name = e.target.value;
                const projectID = id;
                eventAggregator.publish("updateProjectName", {name, projectID});
            }
        };

        const inputEvent = (id) => {
            const input = document.querySelector(`#p-input-${id}`);
            input.addEventListener('keyup', e=> enableButton(e, id));
        };

        const editEvent = (id) => {
            const button = document.querySelector(`#p-create-${id}`);
            button.addEventListener('click', e=> enableInput(e, id));
        };

        const completeEvent = (id) => {
            const button = document.querySelector(`#p-check-${id}`);
            button.addEventListener('click', e=> {
                const parent = document.querySelector("#ul-sidebar-projects");
                const targetID = `project-${id}`;

                let children = parent.childNodes;
                Array.from(children).forEach(child => {
                    if(child.id == targetID) {
                        parent.removeChild(child);
                        eventAggregator.publish("removedProjectFromView", {id});
                    }

                });

            });
        };

        const projectSelectionEvent = (id) => {
            const button = document.querySelector(`#p-button-${id}`);
            button.addEventListener('click', e=>projectSelected(e.target.disabled, id));
        };

        const projectSelected = (disabled, id) => {
            console.log("project selected view: ", id);
            console.log("is disabled: ", disabled);
            if(!disabled) {
                eventAggregator.publish("projectSelectedView", {id});
            }
        };

        const initEvents = (id) => {
            console.log("initEvents", id);
            inputEvent(id);
            editEvent(id);
            completeEvent(id);
            projectSelectionEvent(id);
        };
    
        return {initEvents};
    })();
   
    return {render};
};
export {SideBarView};