const Task = (options) => {
    let myTitle = options.title || "";
    let myDetails = options.details || "";
    let myID = options.id || 0;
    let myDate = options.date || "";

    const setTitle = (title) => {
        myTitle = title;
    };

    const setDetails = (details) => {
        myDetails = details;
    };

    const setID = (id) => {
        myID = id;
    };

    const setDate = (date) => {
        myDate = date;
    }

    const getTitle = () => {
        return myTitle;
    };

    const getDetails = () => {
        return myDetails;
    };

    const getID = () => {
        return myID;
    };

    const getDate = () => {
        return myDate;
    }

    return {setTitle, setDetails, setID, setDate, getTitle, getDetails, getID, getDate};
};

export {Task};