import {Project} from './objects/project';
import {Task} from './objects/task';
import {storageAvailable} from './modules/localStorage';
import { eventAggregator } from './modules/EventHandler';
import {View} from './modules/View';

//let myProjects = storageAvailable() ? localStorage.getItem("myProjects") : Project("main", 0);
let myProjects = Project("main", 0);

const id = myProjects.createID();
const p = Project({"name": "chris", id});
const c = {id: p.getID(), name: p.getName()};
View();

eventAggregator.publish("projectAdded", {project: c});
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
    eventAggregator.publish("addTasktoView", {title, details, id, date});
});

eventAggregator.subscribe("removedTaskFromView", eventArgs=> {
    const id = eventArgs.id || "";
    myProjects.removeTask(id);
})
