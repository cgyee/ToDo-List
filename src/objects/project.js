const Project = (options) => {

    let myName = options.name || "";
    let myID = options.id || "";
    let myTasksTable = {};

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

    /* const isValidID = (thisID) => {
        return myTasksArr.every(taskID =>  taskID != thisID ? true: false);
    }; */

    const isValidID = (thisID) => {
        return myTasksTable.hasOwnProperty(thisID) ? false : true;
    };

    const addTaskToTable = (thisTask) => {
        myTasksTable[thisTask.id] = thisTask.task;
    };


    const addTask = (thisTask) => {
        const id =  createID()
        thisTask.setID(id);
        addTaskToTable(thisTask);
    };

    const removeTaskFromTable = (thisID) => {
        if(isValidID(thisID)){
            delete myTasksTable[thisID];
        }
    };

    const removeTask = (thisID) => {
        removeTaskFromTable(thisID);
    };
    
    const createID = () => {
        let randNum = Math.floor(Math.random() * Math.floor(255));
        while(!isValidID(randNum)) {
            randNum = Math.floor(Math.random() * Math.floor(255));
        }

        return randNum;
    };

    const getTasks = () => {
        return myTasksTable;
    }

    return {setName, setID, getName, getID, addTask, removeTask, createID, getTasks};
};

export {Project};