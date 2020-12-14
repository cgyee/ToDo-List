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

    const DetailsCollapsible = (thisDetails, thisID) => {
        const details = thisDetails || "";


        const DIV_CLASSNAME = "flex-content todo-details collapsible-hidden";
        const P_CLASSNAME = "todo-item-text p-details";

        const div = document.createElement('div');
        const p = document.createElement('p');

        div.setAttribute("id", `details-${thisID}`);

        div.className = DIV_CLASSNAME;
        p.className = P_CLASSNAME;
        p.innerText = details;

        div.append(p);
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
        grid.append(div, DetailsCollapsible(options.details, options.id));
        RENDER_AREA.append(grid);

        const e = ToDoItemEvents();
        e.initEvents();

    };

    const ToDoItemEvents = () => {
        const gridParent = document.querySelector('#display-todos');

        const toggleCollapsible = (cssClass) => {
            return cssClass == "flex-content todo-details collapsible-hidden" ? "flex-content todo-details" : "flex-content todo-details collapsible-hidden";
        }

        const collapsibleOnClick = (e) => {
            const targetID = e.target.className === I_CLASSNAME ? e.target.parentElement.id : e.target.id;
            const id = targetID.slice(12);
            console.log(targetID);
            const collapsible = document.querySelector(`#details-${id}`);
            collapsible.className = toggleCollapsible(collapsible.className);
        }

        const collapsibleEvent = () => {
            const collapsibleButtons = document.querySelectorAll(".expand_more");

            collapsibleButtons.forEach(button => {
                button.addEventListener('click', collapsibleOnClick);
            });
        }

        const removeOnClick = (e) => {
            const targetID = e.target.className === "material-icons" ? e.target.id.slice(11) : e.target.id.slice(7);
            console.log(targetID);
            const  parent = document.querySelector(`#grid-${targetID}`);
            let child = parent.firstChild;


            while(child.id != targetID) {
                child = child.nextSibling;
            }
            parent.removeChild(child);
            
        }

        const completeTaskEvent = () => {
            // const checkButtons = document.querySelectorAll(`.${BUTTON_CLASSNAME}`);
            const checkButtons = document.querySelectorAll(".check-button-todo");
            
            checkButtons.forEach(button => {
                button.addEventListener('click', removeOnClick);
            });
        }

        const initEvents = () => {
            collapsibleEvent();
            completeTaskEvent();
        }

        return {initEvents};
    };

    eventAggregator.subscribe("addTasktoView", eventArgs => {render(eventArgs)});
};

export {TodoItemView};