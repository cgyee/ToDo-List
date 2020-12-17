const Project = (options) => {

    let myName = options.name || "";
    let myID = options.id || "";
    let myTasksTable = options.table || {};

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
        return myTasksTable.hasOwnProperty(thisID) ? false : true;
    };

    const addTaskToTable = (thisTask) => {
        myTasksTable[thisTask.getID()] = thisTask;
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
    };

    const getTasksforStorage = () => {
        let tasks = {}

        for (let task in myTasksTable) {
            const id = myTasksTable[task].getID();
            tasks[`task-${id}`] = {};
        }

        for (let task in myTasksTable) {
            const id = myTasksTable[task].getID();
            const title = myTasksTable[task].getTitle();
            const date = myTasksTable[task].getDate();
            const details = myTasksTable[task].getDetails();

            tasks[`task-${id}`] = { id,
                        title,
                        date,
                        details
            };
        }
        return tasks;
    }

    const updateDetails = (options) => {
        if(options.id) {
            const task = myTasksTable[options.id];
            task.setDetails(options.details);
            task.setDate(options.date);
        }
    };

    return {setName, setID, getName, getID, addTask, removeTask, createID, getTasks, updateDetails, getTasksforStorage};
};

export {Project};