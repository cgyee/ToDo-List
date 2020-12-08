const TodoItemView = (taskTitle, id, details) => {
    
    let title = taskTitle || "";
    let myID = id || "";
    let myDetails = details || "";

    const BUTTON_CLASSNAME = "icon-button todo-item-button ";
    const I_CLASSNAME = "materials-icon";

    const titleLeftFlex = ((title) => {
        
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
    })(title);

    const ViewEditFlex = (() => {
        
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

    })();

    const DetailsCollapsible = () => {

        const DIV_CLASSNAME = "flex-content todo-details";
        const P_CLASSNAME = "todo-item-text p-details";

        const div = document.createElement('div');
        const p = document.createElement('p');

        div.className = DIV_CLASSNAME;
        p.className = P_CLASSNAME;
        p.innerText = //Tdodo

        div.append(p);
        return div;
    };

    const render = () => {
        
        const DIV_CLASSNAME = "flex-content todo-item";

        const div = document.createElement('div');
        
        div.className = DIV_CLASSNAME;

        div.append(titleLeftFlex, ViewEditFlex);
        
        return div;
    };

    return {render};
};

export {TodoItemView};