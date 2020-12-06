const { Project } = require("../objects/project");

const SideBarProj = (projName, projID) => {
    
    const LI_CLASSNAME = "sidebar-project-list_item  solid-top-border";
    const P_CLASSNAME = "sidebar-project-list_item  solid-top-border";
    const container = "ul-sidebar-projects";
    
    let myProjName = projName;
    let myProjID = projID;

    const renderArea = () => {
        return container;
    };

    const render = () => {
        const li = document.createAttribute('li');
        li.className = LI_CLASSNAME;
        li.id = myProjID;

        const p = document.createElement('p');
        p.className = P_CLASSNAME;
        p.innerText = myProjName;

        li.appendChild(li);

        return li;
    };
   
    return {renderArea, render};
};

export {SideBarProj};