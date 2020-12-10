import {Project} from './objects/project';
import {storageAvailable} from './modules/localStorage';
import { eventAggregator } from './modules/EventHandler';
import {View} from './modules/View';

let myProjects = storageAvailable() ? localStorage.getItem("myProjects") : Project("main", 0);

const id = myProjects.createID();
const p = Project("chris", id);
const c = {id: p.getID(), name: p.getName()};

myProjects.addTask(id, p);
console.log(myProjects.getName());

View();

eventAggregator.publish("projectAdded", {project: c});
