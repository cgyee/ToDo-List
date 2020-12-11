const Events = (name) => {
    let myName = name || "";
    let handlers = [];

    const addHandler = (handler) => {
        handlers.push(handler);
    };

    const removeHandler = (handler) => {
        const index = handlers.indexOf(handler);
        handlers.splice(index, 1);
    };

    const fire = (eventArgs) => {
        handlers.forEach(h => {
           h(eventArgs);
        });
    };
    return {addHandler, removeHandler, fire, myName};
};

const eventAggregator = (() => {
    let events = [];

    const getEventName = (name) => {
        const v = events.filter(event => event.myName == name)[0];
        return v;
    };

    const publish = (eventName, eventArgs) => {
        let event = getEventName(eventName);

        if(!event) {
            event = Events(eventName);
            console.log(eventName);
            events.push(event);
        }
        event.fire(eventArgs);
    };

    const subscribe = (eventName, handler) => {
        let event = getEventName(eventName);

        if(!event) {
            event = Events(eventName);
            events.push(event);
        }

        event.addHandler(handler);
    };
    
    return {publish, subscribe};
})();

export {Events, eventAggregator};