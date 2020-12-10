const { eventAggregator } = require("./EventHandler");

const TodoView = () => {
    const RENDER_AREA_ID = "#display-todos";
    const RENDER_AREA = document.querySelector(RENDER_AREA_ID);

    eventAggregator.subscribe("projectSelected", eventArgs => {
        const project = eventArgs.project;
        
        clearTaskDisplay();
        for(task in project) {
            const title = project[task].getTitle();
            const details = project[task].getDetails();
            const id = project[task].getID();

            eventAggregator.publish("addTasktoView", {title, details, id})
        } 
    });

    eventAggregator.subscribe("addTask", task => {
        const title = task.getTitle();
        const details = task.getDetails();
        const id = task.getID();

        eventAggregator.publish("addTasktoView", {title, details, id});
    });

    const clearTaskDisplay = () => {
        while(RENDER_AREA.firstChild) {
            RENDER_AREA.removeChild(RENDER_AREA.firstChild);
        }
    }

}

const TodoViewEventListener = () => {
    
    const getTaskInput = () => {
        const INPUT_ID = "#new-task-todo-input";
        const INPUT = document.querySelector(INPUT_ID);

        return INPUT.textContent;

    }

    const addTaskOnClick = () => {
        const BUTTON_ID = "#new-task-todo-button";
        const BUTTON = document.querySelector(BUTTON_ID);

        BUTTON.addEventListener('click', e => {
            task = getTaskInput();
            
        })
    }
}