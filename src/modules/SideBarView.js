const { Project } = require("../objects/project");

const SideBarView = (projName, projID) => {
    
    const LI_CLASSNAME = "sidebar-project-list_item  solid-top-border";
    const P_CLASSNAME = "center-list-item";
    const container = "#ul-sidebar-projects";
    
    let myProjName = projName || "";
    let myProjID = projID || "";

    const renderArea = () => {
        return container;
    };

    const render = () => {
        
        const li = document.createElement('li');
        li.className = LI_CLASSNAME;
        li.id = myProjID;

        const p = document.createElement('p');
        p.className = P_CLASSNAME;
        p.innerText = myProjName;

        li.append(p);

        return li;
    };
   
    return {renderArea, render};
};

const SideBarProjEvents = () => {
    
    const getProjectNodes = () => {
        
        const SELECTOR_CLASSNAME = ".sidebar-project-list_item";

        const projNodes = document.querySelectorAll(SELECTOR_CLASSNAME);
        return projNodes;
    };

    const updateProjListener = (projArray) => {
        
        const myProjs  = projArray;

        myProjs.forEach(project => {
            project.addEventListener('click', e => {console.log(e.target.parentElement.id || e.target.id);});
        });
    };

    const update = () => {
        updateProjListener(getProjectNodes());
    };

    return {update};
};
export {SideBarView, SideBarProjEvents};