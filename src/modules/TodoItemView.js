import { eventAggregator } from "./EventHandler";

const TodoItemView = () => {

    const RENDER_AREA_ID = "#display-todos";
    const RENDER_AREA = document.querySelector(RENDER_AREA_ID);

    const BUTTON_CLASSNAME = "icon-button todo-item-button";
    const I_CLASSNAME = "material-icons";

    const titleLeftFlex = (thisTitle, thisID) => {

        const title = thisTitle || "";

        const DIV_CLASSNAME = "flex-content";
        const SPAN_CLASSNAME = "todo-item-text";
        const I_ICON = "check_circle_outline";

        const div = document.createElement('div');
        const button = document.createElement('button');
        const i = document.createElement('i');
        const span = document.createElement('span');

        div.className = DIV_CLASSNAME;
        button.className = "check-button-todo";
        i.className = I_CLASSNAME;
        span.className = SPAN_CLASSNAME;

        span.innerText = title;
        i.innerText = I_ICON;

        button.setAttribute("id", `button-${thisID}`);
        i.setAttribute("id", `check-mark-${thisID}`);

        button.append(i);
        div.append(button, span);

        return div;
    };

    const ViewEditFlex = (thisID) => {
        
        const buttonOptions = ["expand_more",
                                "create",
                                "delete"];

        const DIV_CLASSNAME = "flex-content todo-item-options";
        const BTN_CLASSNAME = `${BUTTON_CLASSNAME} todo-item-option`;

        const div = document.createElement('div');
        div.className = DIV_CLASSNAME;

        buttonOptions.forEach(option => {
            
            const button = document.createElement('button');
            const i = document.createElement('i');

            button.id = `${option}-${thisID}`;

            button.className = option + " " + BTN_CLASSNAME;
            i.className = I_CLASSNAME;

            i.textContent = option;

            button.append(i);
            div.append(button);
        });

        return div;
    };

    const DetailsCollapsible = (specs) => {
        const details = specs.details || "";


        const DIV_CLASSNAME = "flex-content todo-details collapsible-hidden";
        const SPEC_CLASSNAME = "todo-item-text p-details";

        const div = document.createElement('div');
        const element = document.createElement(specs.element);

        div.setAttribute("id", `details-${specs.element}-${specs.id}`);
        element.setAttribute("id", `${specs.element}-${specs.id}`);

        div.className = DIV_CLASSNAME;
        element.className = SPEC_CLASSNAME;
        element.innerText = details;

        div.append(element);
        return div;
    };

    const render = (options) => { 

        const DIV_CLASSNAME = "flex-content todo-item";
        const GRID_CLASSNAME = "grid grid-todos";

        const grid = document.createElement('div');
        const div = document.createElement('div');

        grid.setAttribute("id", `grid-${options.id}`);
        div.setAttribute("id", options.id);

        grid.className = GRID_CLASSNAME;
        div.className = DIV_CLASSNAME;

        div.append(titleLeftFlex(options.title, options.id), ViewEditFlex(options.id));
        grid.append(div, 
            DetailsCollapsible({"element":'p', "id": options.id, "details": options.details}),
            DetailsCollapsible({"element":'textarea', "id": options.id, "details": options.details}));
        RENDER_AREA.append(grid);

        const e = ToDoItemEvents();
        e.initEvents();

    };

    const ToDoItemEvents = () => {

        const toggleCollapsible = (cssClass) => {
            return cssClass == "flex-content todo-details collapsible-hidden" ? "flex-content todo-details" : "flex-content todo-details collapsible-hidden";
        }

        const collapsibleOnClick = (e) => {
            expand_more
            const targetID = e.target.className === I_CLASSNAME ? e.target.parentElement.id : e.target.id;
            const id = targetID.slice(12);
            const collapsible = document.querySelector(`#details-p-${id}`);
            collapsible.className = toggleCollapsible(collapsible.className);
        }

        const collapsibleEvent = () => {
            const options = [
                ".expand_more",
            ];

            options.forEach(option => {
                const collapsibleButtons = document.querySelectorAll(option);

                collapsibleButtons.forEach(button => {
                    button.addEventListener('click', collapsibleOnClick);
                });
            });
        }

        const getTextAreaInput = (text) => {
            return text ? text : "";
        }

        const collapsibleOnClickEdit = (e) => {
            const targetID_BUTTON_Name = "create-";
            const targetID = e.target.className === I_CLASSNAME ? e.target.parentElement.id : e.target.id;
            const id = targetID.slice(8);
            const editCollapsible = document.querySelector(`#details-textarea-${id}`);

            editCollapsible.className = toggleCollapsible(editCollapsible.className);

            // eventAggregator.publish("updateDetails", {"id": id, "details": getTextAreaInput(editCollapsible.textContent)});
            

        }

        const editEvent = () => {
            const options = [
                ".create",
            ];

            options.forEach(option => {
                
                const buttons = document.querySelectorAll(option);
                console.log(buttons);
                buttons.forEach(button => {
                    button.addEventListener('click', collapsibleOnClickEdit);
                });
            });
        }

        const removeOnClick = (e) => {
            const targetID_I_Name = "check_mark-";
            const targetID_BUTTON_Name = "button-";
            const targetID = e.target.className === "material-icons" ? e.target.id.slice(targetID_I_Name.length+1) : e.target.id.slice(targetID_BUTTON_Name.length+1);
            const  parent = document.querySelector(`#grid-${targetID}`);
            let child = parent.firstChild;


            while(child.id != targetID) {
                child = child.nextSibling;
            }
            parent.removeChild(child);
            
            //eventAggregator.publish("taskRemovedFromView", {id:targetID});  
        }

        const completeTaskEvent = () => {

            const options = [
                ".check-button-todo",
            ];

            options.forEach(option => {
                const checkButtons = document.querySelectorAll(option);
                checkButtons.forEach(button => {
                    button.addEventListener('click', removeOnClick);
                });
            });
            
        }

        const initEvents = () => {
            collapsibleEvent();
            completeTaskEvent();
            editEvent();
        }

        return {initEvents};
    };

    eventAggregator.subscribe("addTasktoView", eventArgs => {render(eventArgs)});
};

export {TodoItemView};