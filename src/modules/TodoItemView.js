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
                                ];

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
        const MAX_LENGTH = 120;


        const DIV_CLASSNAME = "flex-content todo-details collapsible-hidden";
        const SPEC_CLASSNAME = `todo-item-text ${specs.element}-details`;

        const div = document.createElement('div');
        const element = document.createElement(specs.element);

        div.setAttribute("id", `details-${specs.element}-${specs.id}`);
        element.setAttribute("id", `${specs.element}-${specs.id}`);

        if(specs.element === 'textarea') {
            element.setAttribute("maxlength", MAX_LENGTH);
        }

        div.className = DIV_CLASSNAME;
        element.className = SPEC_CLASSNAME;
        element.textContent = details;

        div.append(element);

        eventAggregator.subscribe("detailsUpdated", eventArgs => {
            element.textContent = eventArgs.details;
        });
        return div;
    };

    const dateFlex = (thisID, thisDate) => {
        const div =document.createElement('div');
        const input = document.createElement('input');
        const id = `dateInput-${thisID}`;

        input.className = "solid-bottom-border new-task-todo-input";        
        input.setAttribute("id", id);
        input.setAttribute("value", thisDate);
        input.setAttribute("type", "date");
        input.disabled = true;

        div.append(input);
        return div;

    };

    const render = (options) => { 

        const DIV_CLASSNAME = "flex-content todo-item";
        const GRID_CLASSNAME = "grid grid-todos";

        const grid = document.createElement('div');
        const div = document.createElement('div');

        grid.setAttribute('id', `grid-${options.id}`);
        div.setAttribute("id", options.id);

        grid.className = GRID_CLASSNAME;
        div.className = DIV_CLASSNAME;

        div.append(titleLeftFlex(options.title, options.id), dateFlex(options.id, options.date), ViewEditFlex(options.id));
        grid.append(div, 
            DetailsCollapsible({"element":'p', "id": options.id, "details": options.details}),
            DetailsCollapsible({"element":'textarea', "id": options.id, "details": options.details}));
        RENDER_AREA.append(grid);

        const e = ToDoItemEvents();

        const id = options.id;
        const projectID = options.projectID;
        e.initEvents(id, projectID);

    };

    const ToDoItemEvents = () => {

        const toggleCollapsible = (cssClass) => {
            return cssClass == "flex-content todo-details collapsible-hidden" ? "flex-content todo-details" : "flex-content todo-details collapsible-hidden";
        };

        const collapsibleOnClick = (e) => {
            const targetID = e.target.className === I_CLASSNAME ? e.target.parentElement.id : e.target.id;
            const id = targetID.slice(12);
            const collapsible = document.querySelector(`#details-p-${id}`);
            collapsible.className = toggleCollapsible(collapsible.className);
        };

        const collapsibleEvent = (id) => {
            const button = document.querySelector(`#expand_more-${id}`); 
            button.addEventListener('click', collapsibleOnClick);
        };

        const collapsibleOnClickEdit = (e, projID) => {
            const targetID = e.target.className === I_CLASSNAME ? e.target.parentElement.id : e.target.id;
            const id = targetID.slice(7);

            const targetButton =  `#create-${id}`;
            const targetParent = "#details-textarea-"+id;
            const targetText = `#textarea-${id}`;
            const tartgetDate = `#dateInput-${id}`;

            const button = document.querySelector(targetButton);
            const editCollapsible = document.querySelector(targetParent);
            const textarea = document.querySelector(targetText);
            const datePicker = document.querySelector(tartgetDate);


            textarea.addEventListener('keydown', e=> {
                button.disabled = e.target.value ? false : true;
            });

            if(textarea.value && editCollapsible.className === "flex-content todo-details") {
                const projectID = projID;
                eventAggregator.publish("updateDetails", {"id": id, "details": textarea.value, "date": datePicker.value, "projetID": projectID});
            }

            datePicker.disabled = datePicker.disabled ? false : true;
            editCollapsible.className = toggleCollapsible(editCollapsible.className);
        };

        const editEvent = (id, projID) => {
            const button = document.querySelector(`#create-${id}`);
            button.addEventListener('click', e=> collapsibleOnClickEdit(e, projID));

        };

        const removeOnClick = (id, projID) => {
            const targetID = `grid-${id}`;
            const parent = document.querySelector('#display-todos');
            let children = parent.childNodes;

            Array.from(children).forEach(child => {
                if(child.id == targetID) {
                    parent.removeChild(child);
                    const targetID = child.id;
                    const id = targetID.slice(5);
                    const projectID = projID;

                    eventAggregator.publish("removedTaskFromView", {id, projectID});
                }

            });
        };

        const completeTaskEvent = (id, projID) => {
            const button = document.querySelector(`#button-${id}`);
            button.addEventListener('click', e=>removeOnClick(id, projID));
        };

        const initEvents = (id, pID) => {
            const thisID = id || "";
            const projID = pID || "";
            collapsibleEvent(thisID);
            completeTaskEvent(thisID, projID);
            editEvent(thisID, projID);
        };

        return {initEvents};
    };

    eventAggregator.subscribe("addTasktoView", eventArgs => render(eventArgs));
    eventAggregator.subscribe("addMultipleTaskstoView", eventArgs => {
        const tasks = eventArgs.tasks || {};
        for(let task in tasks) {
            const title = tasks[task].getTitle();
            const id = tasks[task].getID();
            const date = tasks[task].getDate();
            const details = tasks[task].getDetails();
            eventAggregator.publish("addTasktoView", {title, id, date, details});
        };
    });
};

export {TodoItemView};