import { Project } from './project';
import {ProjectController} from './ProjectController';
import {Task} from './task';

const saveTask = (project) => {
    const tasks = project.getTasksforStorage();
    const tasks_storage = JSON.stringify(tasks);

    return tasks_storage;
};

const saveProject = (project) => {
    const name = project.getName();
    const id = project.getID();
    const thisproject = {name, id};
    const project_storage = JSON.stringify(thisproject);
    
    return project_storage;
};

const saveProjectController = (controller) => {
    let projects = controller.getProjects();
    let controllerSerial = {};
    // console.log(projects);

    projects.forEach(project => {
        const id = project.getID();
        controllerSerial[id] = {};
    });

    projects.forEach(project => {
        const tasks = saveTask(project);
        const thisproject = saveProject(project);
        const id = project.getID();

        controllerSerial[id] = JSON.stringify({"projectInfo":thisproject, "tasks":tasks});
    });

    // console.log(controllerSerial);

    return controllerSerial;
    // localStorage.setItem("controllerSerial", controllerSerial);
};

const save = (controller) => {
    // const tasks = saveTask(project);
    // const thisproject = saveProject(project);
    // const project_storage = JSON.stringify({"projectInfo":thisproject, "tasks":tasks});
    const controlerSerial = JSON.stringify(saveProjectController(controller)) || "";

    localStorage.setItem("controllerSerial", controlerSerial);
};

const loadProjectController = () => {
    let controllerDeserialized = localStorage.getItem("controllerSerial") || "";
    controllerDeserialized = JSON.parse(controllerDeserialized) || "";
    return controllerDeserialized;
};

const loadProject = (project) => {
    const projectInfo = loadProjectInfo(project.projectInfo);
    const tasks = loadTask(project.tasks);
    const deserializedProject = Object.assign({}, {projectInfo}, {tasks});
    return deserializedProject;
};

const loadTask = (tasks) => {
    const task = tasks ? JSON.parse(tasks) : "";
    return task;
};

const loadProjectInfo = (project_info) => {
    const projectInfo = project_info ? JSON.parse(project_info) : "";
    return projectInfo;

};

const load = () => {
    let controllerDeserialized = localStorage.getItem("controllerSerial");
    // console.log(controllerDeserialized);
    controllerDeserialized = JSON.parse(controllerDeserialized);
    // console.log(controllerDeserialized);

    for (let proj in controllerDeserialized) {
        const project = JSON.parse(controllerDeserialized[proj]);
        // console.log("project: ",project);
        const projectDeserialized = loadProject(project);
        // console.log("deserialized project: ", projectDeserialized)
        const newProject = ProjectSetup(Project({}), projectDeserialized);
        ProjectController.addProject(newProject);
    }
};

const ProjectSetup = (project, info) => {
    const tasks = info.tasks;
    console.log("projectInfo ", info);
    project.setName(info.projectInfo.name);
    project.setID(info.projectInfo.id);

    for (let task in tasks) {
        const id = tasks[task].id || 0;
        const title = tasks[task].title || "default";
        const date = tasks[task].date || "";
        const details = tasks[task].details || "";
        const thisTask = Task({id, title, date, details});

        project.addTask(thisTask);
    }
    // console.log("project setup: ", project);
    return project;
};

const compare = (a, b) => {
    if(a.getID() < b.getID()) {
        return -1;
    }

    else if (a.getID() > b.getID()) {
        return 1;
    }

    return 0;
};

export {save, load, ProjectSetup, compare, saveProjectController};