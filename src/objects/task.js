const Task = (title, details,...args) => {
    let myTitle = title;
    let myDetails = details;
    let myID;

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