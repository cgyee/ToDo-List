import {Project} from './objects/project';
import {Task} from './objects/task';
import { eventAggregator } from './modules/EventHandler';
import {View} from './modules/View';
import {save, load, ProjectSetup} from './objects/helper'

let project = load();
const myProjects = Project({"name": "name", "id":0});
if(project) {
    ProjectSetup(myProjects, project);
}

const id = myProjects.createID();
const p = Project({"name": "default", id});
const cappa = {id: p.getID(), name: p.getName()};
View();

if(project) {
    eventAggregator.publish("addMultipleTaskstoView", {"tasks":myProjects.getTasks()});
}

eventAggregator.subscribe("saveProject", eventArgs => {
    save(myProjects);
});

eventAggregator.subscribe("updateProjectName", eventArgs => {
    
} )

eventAggregator.publish("projectAdded", {project: cappa});
eventAggregator.subscribe("createTask", eventArgs => {
    const task = Task(eventArgs);
    eventAggregator.publish("addTask", {task});
});

eventAggregator.subscribe("updateDetails", eventArgs => {
    const tasks = myProjects.getTasks();
    const details = eventArgs.details;
    const date = eventArgs.date;
    const id =  eventArgs.id;

    const task = tasks[id];
    task.setDetails(details);
    task.setDate(date);
    
    eventAggregator.publish("detailsUpdated", {details, date});
});

eventAggregator.subscribe("addTask", eventArgs => {
    const task = eventArgs.task;
    myProjects.addTask(task);
    const title = task.getTitle();
    const details = task.getDetails();
    const id = task.getID();
    const date = task.getDate();

    eventAggregator.publish("saveProject", {});
    eventAggregator.publish("addTasktoView", {title, details, id, date});
});

eventAggregator.subscribe("removedTaskFromView", eventArgs=> {
    const id = eventArgs.id || "";
    myProjects.removeTask(id);
    eventAggregator.publish("saveProject", {});
});
