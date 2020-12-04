const DOMtodo = () => {
    const DIV_CLASSNAME = "flex-content todo-details";
    const P_CLASSNAME = "todo-item-text p-details";

    const render = () => {
        const div = document.createElement('div');
        const p = document.createElement('p');

        div.className = DIV_CLASSNAME;
        p.className = P_CLASSNAME;
    }
}