const Task = (options) => {
    let myTitle = options.title || "";
    let myDetails = options.details || "";
    let myID = options.id || 0;

    const setTitle = (title) => {
        myTitle = title;
    };

    const setDetails = (details) => {
        myDetails = details;
    };

    const setID = (id) => {
        myID = id;
    };

    const getTitle = () => {
        return myTitle;
    };

    const getDetails = () => {
        return myDetails;
    };

    const getID = () => {
        return myID;
    };

    return {setTitle, setDetails, setID, getTitle, getDetails, getID};
};

export {Task};