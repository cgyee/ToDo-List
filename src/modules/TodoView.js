import { eventAggregator } from "./EventHandler";

const TodoView = () => {

    const clearTaskDisplay = () => {
        const RENDER_AREA_ID = "#display-todos";
        const RENDER_AREA = document.querySelector(RENDER_AREA_ID);

        while(RENDER_AREA.firstChild) {
            RENDER_AREA.removeChild(RENDER_AREA.firstChild);
        }
    };

    const TodoViewEvent = (() => {

        const toggleAddTaskButton = (bool, id) => {
            console.log(bool, id);
            const button = document.querySelector(id);
            button.disabled = bool;
        }

        const textIsValid = (id) => {
            const text = document.querySelector(id);
            return text.value ? true: false;
        };

        const checkAndEnableAddButton = (id) => {
                let temp = textIsValid(id.input);
                const bool = !temp;

                toggleAddTaskButton(bool, id.button); 
        }

        const inputEvent = (id) => {
            console.log(id);
            const textarea = document.querySelector(id.input);
            textarea.addEventListener('keydown', e => {
                checkAndEnableAddButton(id);
            });
        }

        const displayModalonClick = () => {
            const BUTTON_ID = "#new-task-todo-button";
            const BUTTON = document.querySelector(BUTTON_ID);
    
            BUTTON.addEventListener('click', e => {
                const modal = document.querySelector('.modal');
                modal.style.display = "block";
            });
        };
    

        const initEvents = () => {
            const input = "#new-task-todo-input";
            const button = "#new-task-todo-button"

            inputEvent({input, button});
            displayModalonClick();

        }

        initEvents();

        const ModalEvent = (() => {

            const clearTextInput = () => {
                const text = document.querySelector('#modal-text-input');
                text.value = "";
            }

            const getTextInput = () => {
                const text = document.querySelector('#modal-text-input');
                return text.value;
            }

            const getToDoTitle = () => {
                const name = document.querySelector('#new-task-todo-input');
                return name.value;
            }

            const clearModal = () => {
                    const modal = document.querySelector('.modal');
                    modal.style.display = "none";
                    clearTextInput();
            }

            const createNewTask = () => {
                const title = getToDoTitle();
                const details = getTextInput();
                clearModal();
                eventAggregator.publish("createTask", {title, details});
            }
            
            const addTaskonClick = () => {
                const button = document.querySelector('#confirm-modal');
                button.addEventListener('click', e => createNewTask())

            };

            const closeModal = () => {
                const button = document.querySelector('#close-modal');
                button.addEventListener('click', e=> {
                    clearModal();
                })
            };

            const initEvents = () => {
                const input = '#modal-text-input';
                const button = '#confirm-modal';
                inputEvent({input, button});
                addTaskonClick();
                closeModal();
            }

            initEvents();
        })()

    })();

    eventAggregator.subscribe("projectSelected", eventArgs => {
        const project = eventArgs.project;
        
        clearTaskDisplay();
        for(let task in project) {
            const title = project[task].getTitle();
            const details = project[task].getDetails();
            const id = project[task].getID();

            eventAggregator.publish("addTasktoView", {title, details, id});
        } 
    });

    /* eventAggregator.subscribe("addTask", eventArgs => {
        const task = eventArgs.task;
        const title = task.getTitle();
        const details = task.getDetails();
        const id = task.getID();

        eventAggregator.publish("addTasktoView", {title, details, id});
    }); */
};

export {TodoView};

