import {SideBarProj, SideBarProjEvents} from './modules/DOMsidebarprojects';
import {Project} from './objects/project';

const test = Project("Chris", 1);
console.log(test.getName());
console.log(test.getID());

const testSide = SideBarProj(test.getName(), test.getID());

const ul = document.querySelector(testSide.renderArea());

//console.log(testSide.render());

ul.append(testSide.render());

const events = SideBarProjEvents();
events.update();

