const ProjectController = (() => {
    let projects = [];

    const addProject = (project) => {
        const id = createID();
        project.setID(id);
        projects.push(project);
    };

    const removeProject = (project) => {
        projects = projects.filter(p => p!=project);
    };

    const getProject = (id) => {
        let project = projects.filter(p => p.getID() == id)[0];
        return project;
    };

    const getProjects = () => {
        return projects;
    };

    const createID = () => {
        let randNum = Math.floor(Math.random() * Math.floor(1048));
        return randNum;
    };

    const projectCount = () => {
        return projects.length;
    }

    return {addProject, removeProject, getProjects, getProject, projectCount};
})();

export {ProjectController};