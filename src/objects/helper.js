import {Task} from './task'

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
}

const save = (project) => {
    const tasks = saveTask(project);
    const thisproject = saveProject(project);
    const project_storage = JSON.stringify({"projectInfo":thisproject, "tasks":tasks})
    console.log(project_storage);

    localStorage.setItem("project", project_storage);
}

const loadProject = () => {
    let project = localStorage.getItem("project");
    project = JSON.parse(project);

    return project;
}

const loadTask = () => {
    const project = loadProject();
    const tasks = project ? JSON.parse(project.tasks) : "";

    return tasks;
}

const loadProjectInfo = () => {
    const project = loadProject();
    const projectInfo = project ? JSON.parse(project.projectInfo) : "";

    return projectInfo;

}

const load = () => {
    const loadtask = loadTask();
    const loadProj = loadProjectInfo();

    const tasks = loadtask ? loadtask : "";
    const projectInfo = loadProj ? loadProj : "";
    const project = tasks && projectInfo ? Object.assign({} ,{"tasks":tasks}, projectInfo) : "";

    return project;
}

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
}
export {save, load, ProjectSetup};