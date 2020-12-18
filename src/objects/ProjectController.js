const ProjectController = (() => {
    let projects = [];

    const addProject = (project) => {
        projects.push(project);
    };

    const removeProject = (project) => {
        projects = projects.filter(p => p!=project);
    };

    const getProject = (id) => {
        let project = projects.filter(p => p.getID() == id)[0];
        return project;
    }

    const getProjects = () => {
        return projects;
    };

    return {addProject, removeProject, getProjects};
})();

export {ProjectController};