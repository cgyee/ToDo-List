import { eventAggregator } from "./EventHandler";

const TodoItemView = () => {

    const RENDER_AREA_ID = "#display-in-container";
    const RENDER_AREA = document.querySelector(RENDER_AREA_ID);

    const BUTTON_CLASSNAME = "icon-button todo-item-button ";
    const I_CLASSNAME = "materials-icon";

    const titleLeftFlex = (thisTitle) => {

        const title = thisTitle || "";

        const DIV_CLASSNAME = "flex-content";
        const SPAN_CLASSNAME = "todo-item-text";
        const I_ICON = "check_circle_outline";

        const div = document.createElement('div');
        const button = document.createElement('button');
        const i = document.createElement('i');
        const span = document.createElement('span');

        div.className = DIV_CLASSNAME;
        button.className = BUTTON_CLASSNAME;
        i.className = I_CLASSNAME;
        span.className = SPAN_CLASSNAME;

        span.innerText = title;
        i.innerText = I_ICON;

        button.append(i);
        div.button.append(button, span);

        return div;
    };

    const ViewEditFlex = () => {
        
        const buttonOptions = ["expand_more",
                                "create",
                                "delete"];

        const DIV_CLASSNAME = "flex-content todo-item-options";
        const BTN_CLASSNAME = BUTTON_CLASSNAME + "todo-item-option";

        const div = document.createElement('div');
        div.className = DIV_CLASSNAME;

        buttonOptions.forEach(option => {
            
            const button = document.createElement('button');
            const i = document.createElement('i');

            button.id = option;

            button.className = BTN_CLASSNAME;
            i.className = I_CLASSNAME;

            i.innerText = option;

            button.append(i);

            div.append(button);
        });

    };

    const DetailsCollapsible = (thisDetails) => {
        const details = thisDetails || "";


        const DIV_CLASSNAME = "flex-content todo-details collapsible-hidden";
        const P_CLASSNAME = "todo-item-text p-details";

        const div = document.createElement('div');
        const p = document.createElement('p');

        div.className = DIV_CLASSNAME;
        p.className = P_CLASSNAME;
        p.innerText = details;

        div.append(p);
        return div;
    };

    const render = (options) => { 

        const DIV_CLASSNAME = "flex-content todo-item";

        const div = document.createElement('div');

        div.setAttribute("id", options.id);
        div.className = DIV_CLASSNAME;

        div.append(titleLeftFlex(options.title), ViewEditFlex, DetailsCollapsible(options.details));
        
        RENDER_AREA.append(div);

        ToDoItemEvents.collaspsibleOnClick();

    };

    const ToDoItemEvents = (() => {

        const toggleCollapsible = (display) => {
            if(display ==="flex") {
                display = "none";
            }

            else {
                display = "flex";
            }
        }

        const collaspsibleOnClick = () => {
            const collapsibleButtons = document.querySelectorAll(".flex-content todo-details collapsible-hidden");
            collapsibleButtons.forEach(button => {
                button.addEventListener('click', e => toggleCollapsible(e.sytle.display))
            });
        }

        return {collaspsibleOnClick};
    })();

    eventAggregator.subscribe("addTasktoView", eventArgs => render(eventArgs));
};

export {TodoItemView};