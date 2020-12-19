import {Project} from './objects/project';
import {Task} from './objects/task';
import {ProjectController} from './objects/ProjectController';
import {eventAggregator } from './modules/EventHandler';
import {View} from './modules/View';
import {save, load} from './objects/helper';

// let project = load();
// const myProjects = Project({"name": "name", "id":0});
// if(project) {
//     ProjectSetup(myProjects, project);
// }

// ProjectController.addProject(myProjects);

// const id = myProjects.createID();
// const p = Project({"name": "default", id});
// const cappa = {id: p.getID(), name: p.getName()};

View();
load();


// if(project) {
//     eventAggregator.publish("addMultipleTaskstoView", {"tasks":myProjects.getTasks()});
// }

eventAggregator.subscribe("saveProject", eventArgs => {
    // save(myProjects);
    save(ProjectController);
});

eventAggregator.subscribe("createNewProject", eventArgs => {
    const name = eventArgs.name || "default";
    const project = Project({name});
    ProjectController.addProject(project);
    const id = project.getID();
    console.log("new project id", id);
    eventAggregator.publish("addProjectToView", {name, id});
    eventAggregator.publish("projectSelected", {"projectID": id});
});

eventAggregator.subscribe("updateProjectName", eventArgs => {
    const id = eventArgs.id || "";
    if(id) {
    const project = ProjectController.getProject(id);
        if(project) {
            const name = eventArgs.name || "default";
            project.setName(name);
        }
    }
    
});

eventAggregator.subscribe("projectSelectedView", eventArgs => {
    const id = eventArgs.id || "";
    if(id) {
        const project = ProjectController.getProject(id);
        const tasks = project.getTasks();
        const projectID = id;
        eventAggregator.publish("projectSelected", {tasks, projectID});

    }

});

eventAggregator.subscribe("createTask", eventArgs => {
    const task = Task(eventArgs);
    const projectID = eventArgs.projectID || "";
    eventAggregator.publish("addTask", {task, projectID});
});

eventAggregator.subscribe("updateDetails", eventArgs => {
    // const tasks = myProjects.getTasks();
    const projectID = eventArgs.projectID;
    const project = ProjectController.getProject(projectID);

    const details = eventArgs.details;
    const date = eventArgs.date;
    const id =  eventArgs.id;

    // const task = tasks[id];
    // task.setDetails(details);
    // task.setDate(date);

    project.updateDetails({id, details, date});
    
    eventAggregator.publish("detailsUpdated", {details, date, projectID});
});

eventAggregator.subscribe("addTask", eventArgs => {
    const task = eventArgs.task;
    const projectID = eventArgs.projectID;
    const project = ProjectController.getProject(projectID);
    console.log("project: ", project);
    console.log("project id: ", projectID);
    project.addTask(task);

    const title = task.getTitle();
    const details = task.getDetails();
    const id = task.getID();
    const date = task.getDate();

    eventAggregator.publish("saveProject", {});
    eventAggregator.publish("addTasktoView", {title, details, id, date, projectID}); //Todo Next Sub addTaskToView
});

eventAggregator.subscribe("removedTaskFromView", eventArgs=> {
    const id = eventArgs.id || "";
    const projectID = eventArgs.projectID || "";
    const project = ProjectController(projectID);

    project.removeTask(id);
    // myProjects.removeTask(id);
    eventAggregator.publish("saveProject", {});
});

if(ProjectController.projectCount()) {
    const project = ProjectController.getProjects()[0];
    console.log(project);
    console.log("projects", ProjectController.getProjects());
    const tasks = project.getTasks();
    const projectID = project.getID();
    
    eventAggregator.publish("addMultipleTaskstoView", {tasks, projectID});
}
