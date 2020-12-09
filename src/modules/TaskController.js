import { eventAggregator } from "./EventHandler";

const { Project } = require("../objects/project");
const { Task } = require("../objects/task");

const ProjectController = (() => {

    const addToProject = (Project, Task) => {
        Task = Task || {};

        const newID = Project.createID();
        
        Task.setID(newID);
        Project.addTask(newID, Task);

        eventAggregator.publish("addTask", {"title": Task.getTitle(),
                                             "details": Task.getDetails(), 
                                             "id": Task.getID() });
    };

    const removeFromProject = (Project, Task) => {
        Project.removeTask(Task.getID());

        eventAggregator.publish("removeTask", {"id": Task.getID()});
    };

    const setName = (Project, name) => {
        name = name || "I have no naaaaaaammme";
        Project.setName(name);
    };

    return {addToProject, removeFromProject, setName};
})();

const TaskController = (() => {
     
    const setTitle = (Task, title) => {
        title = title || "";

        Task.setTitle(title);
    };

    const setDetails = (Task, details) => {
        details = details || "";

        Task.setDetails(details);
    };
    
    return{setTitle, setDetails};
})();

export {ProjectController, TaskController};