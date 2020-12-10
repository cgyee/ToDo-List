import {SideBarProj, SideBarProjEvents} from './modules/DOMsidebarprojects';
import {Project} from './objects/project';
import {storageAvailable} from './modules/localStorage';

let myProjects = storageAvailable() ? localStorage.getItem("myProjects") : {};


//console.log(testSide.render());

ul.append(testSide.render());

const events = SideBarProjEvents();
events.update();

