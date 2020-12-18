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
    console.log(projects);

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

    console.log(controllerSerial);

    return controllerSerial;
    // localStorage.setItem("controllerSerial", controllerSerial);
};

const save = (controller) => {
    // const tasks = saveTask(project);
    // const thisproject = saveProject(project);
    // const project_storage = JSON.stringify({"projectInfo":thisproject, "tasks":tasks});
    const controlerSerial = JSON.stringify(saveProjectController(controller)) || "";

    localStorage.setItem("controllerSerial", controlerSerial);
}

const loadProjectController = () => {
    let controllerDeserialized = localStorage.getItem("controllerSerial") || "";
    controllerDeserialized = JSON.parse(controllerDeserialized) || "";
    return controllerDeserialized;
};

const loadProject = (project) => {
    const projectInfo = loadProjectInfo(project.projectInfo);
    const tasks = loadTask(project.tasks);
    const deserializedProject = Object.assign({}, projectInfo, tasks);
    return deserializedProject;
};

const loadTask = () => {
    const project = loadProject();
    const tasks = project ? JSON.parse(project.tasks) : "";

    return tasks;
};

const loadProjectInfo = () => {
    const project = loadProject();
    const projectInfo = project ? JSON.parse(project.projectInfo) : "";

    return projectInfo;

};

const load = () => {
    let controllerDeserialized = localStorage.getItem("controllerSerial");
    controllerDeserialized = JSON.parse(controllerDeserialized);

    for (let project in controllerDeserialized) {
        const projectDeserialized = loadProject(project);
        const newProject = ProjectSetup(Project(), projectDeserialized);
        ProjectController.addProject(newProject);
    }
};

const ProjectSetup = (project, projectInfo) => {
    const tasks = projectInfo.tasks;

    project.setName(projectInfo.name);
    project.setID(projectInfo.id);

    for (let task in tasks) {
        const id = tasks[task].id || 0;
        const title = tasks[task].title || "default";
        const date = tasks[task].date || "";
        const details = tasks[task].details || "";
        const thisTask = Task({id, title, date, details});

        project.addTask(thisTask);
    }

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