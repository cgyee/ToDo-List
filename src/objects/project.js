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

    const isValidIDTable = (thisID) => {
        return myTasksTable.hasOwnProperty(thisID) ? false : true;
    };

    /* const addTaskIDToArray = (thisID) => {
        myTasksArr.push(thisID);
    }; */

    const addTaskToTable = (thisTask) => {
        myTasksTable[thisTask.id] = thisTask.task;
    };


    const addTask = (thisTask) => {
        addTaskToTable(thisTask);
    };

    /* const removeIDFromArray = (thisID) => {
        const index = myTasksArr.indexOf(thisID);
        if(index != -1) {
            myTasksArr = myTasksArr.filter(task => task != thisID);
        }
    }; */

    const removeTaskFromTable = (thisID) => {
        if(isValidIDTable(thisID)){
            delete myTasksTable[thisID];
        }
    };

    const removeTask = (thisID) => {
        // removeIDFromArray(thisID);
        removeTaskFromTable(thisID);
    };
    
    const createID = () => {
        let randNum = Math.floor(Math.random() * 255) +1;
        while(!isValidIDTable(randNum)) {
            randNum = Math.floor(Math.random() * 255) +1
        }

        return randNum;
    };

    const getTasks = () => {
        return myTasksTable;
    }

    return {setName, setID, getName, getID, addTask, removeTask, createID, getTasks};
};

export {Project};