const Project = (name, id) => {

    let myName = name || "";
    let myID = id || "";
    let myTasksTable = {};
    let myTasksArr = [];

    const setName = (name) => {
        myName = name;
    };

    const setID = (id) => {
        myID = id;
    };

    const getName = () => {
        return myName;
    };

    const getID = () => {
        return myID;
    };

    const isValidID = (thisID) => {
        return myTasksArr.every(taskID =>  taskID != thisID ? true: false);
    };

    const addTaskIDToArray = (thisID) => {
        myTasksArr.push(thisID);
    };

    const addTaskToTable = (thisID, thisTask) => {
        myTasksTable[thisID] = thisTask;
    };

    const addTask = (thisID, thisTask) => {
        if(isValidID(thisID)) {
            addTaskIDToArray(thisID);
            addTaskToTable(thisID, thisTask);
            return true;
        }
        else {
            return false;
        }
    };

    const removeTask = (thisID) => {
        removeIDFromArray(thisID);
        removeTaskFromTable(thisID);
    }

    const removeIDFromArray = (thisID) => {
        const index = myTasksArr.indexOf(thisID);
        if(index != -1) {
            myTasksArr = myTasksArr.filter(task => task != thisID);
        }
    };

    const removeTaskFromTable = (thisID) => {
        delete myTasksTable[thisID];
    };

    return {setName, setID, getName, getID, addTask, removeTask};
};

export {Project};