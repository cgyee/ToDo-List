import { ProjectController } from "../objects/ProjectController";
import { eventAggregator } from "./EventHandler";

const TodoView = () => {
    let currentProject;

    if(ProjectController.projectCount()) {
        currentProject = ProjectController.getProjects()[0].getID() || "";
    }

    const clearTaskDisplay = () => {
        const RENDER_AREA_ID = "#display-todos";
        const RENDER_AREA = document.querySelector(RENDER_AREA_ID);

        while(RENDER_AREA.firstChild) {
            RENDER_AREA.removeChild(RENDER_AREA.firstChild);
        }
    };

    const TodoViewEvent = (() => {

        const toggleAddTaskButton = (bool, id) => {
            const button = document.querySelector(id);
            button.disabled = bool;
        };

        const textIsValid = (id) => {
            const text = document.querySelector(id);
            return text.value ? true: false;
        };

        const checkAndEnableAddButton = (id) => {
                let temp = textIsValid(id.input);
                const bool = !temp;

                toggleAddTaskButton(bool, id.button); 
        };

        const resetNewTaskButton = () => {
            toggleAddTaskButton(true, "#new-task-todo-button");
        }

        const inputEvent = (id) => {
            const textarea = document.querySelector(id.input);
            textarea.addEventListener('keydown', e => {
                checkAndEnableAddButton(id);
            });
        };

        const displayModalonClick = () => {
            const BUTTON_ID = "#new-task-todo-button";
            const BUTTON = document.querySelector(BUTTON_ID);
    
            BUTTON.addEventListener('click', e => {
                const modal = document.querySelector('.modal');
                modal.style.display = "block";
            });
        };

        const initEvents = () => {
            const input = "#new-task-input";
            const button = "#new-task-todo-button";

            inputEvent({input, button});
            displayModalonClick();

        };

        initEvents();

        const ModalEvent = (() => {
            const MAX_LENGTH = 120;

            const clearTextInput = () => {
                const text = document.querySelector('#modal-text-input');
                text.value = "";
            };

            const clearTitleInput = () => {
                const text = document.querySelector('#new-task-input');
                text.value = "";
            };

            const clearDateInput = () => {
                const input = document.querySelector('#new-task-date');
                input.value = "";
            };

            const resetCharacterCount = () => {
                const count = document.querySelector('#character-count');
                count.textContent = "120";
            };

            const getTextInput = () => {
                const text = document.querySelector('#modal-text-input');
                return text.value;
            };

            const changeCharacterCount = () => {
                const char = document.querySelector('#character-count');
                const charCount = MAX_LENGTH - getTextInput().length;

                char.textContent = charCount;
                char.style.color = charCount <= 0 ? "var(--menuGold)" : "var(--ultrav)";
            };

            const getToDoTitle = () => {
                const name = document.querySelector('#new-task-input');
                return name.value;
            };

            const getDate = () => {
                const date = document.querySelector('#new-task-date');
                return date.value;
            };

            const clearModal = () => {
                    const modal = document.querySelector('.modal');
                    modal.style.display = "none";
                    clearTextInput();
                    clearTitleInput();
                    clearDateInput();
                    resetCharacterCount();
                    resetNewTaskButton();
            };

            const createNewTask = () => {
                const title = getToDoTitle();
                const details = getTextInput();
                const date = getDate();
                const projectID = currentProject;
                clearModal();
                eventAggregator.publish("createTask", {title, details, date, projectID});
            };
            
            const addTaskonClick = () => {
                const button = document.querySelector('#confirm-modal');
                button.addEventListener('click', e => createNewTask());

            };

            const closeModal = () => {
                const button = document.querySelector('#close-modal');
                button.addEventListener('click', e=> {
                    clearModal();
                });
            };

            const textAreaEvent = () => {
                const input = document.querySelector('#modal-text-input');
                input.addEventListener('keydown', e => {
                    changeCharacterCount();
                });
            };

            const initEvents = () => {
                const input = '#modal-text-input';
                const button = '#confirm-modal';
                inputEvent({input, button});
                textAreaEvent();
                addTaskonClick();
                closeModal();
            };

            initEvents();
        })();

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

    eventAggregator.subscribe("projectSelected", eventArgs => {
        currentProject = eventArgs.id;
    })
};

export {TodoView};

