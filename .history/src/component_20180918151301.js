import {Shapes, getShape} from "./shape";

function component(renderFunc) {
    return (data, states) => {
        let dataProxy = makeDataProxy(data, [], data);
        let stateProxy = makeStateProxy(state);
        return renderFunc(dataProxy, stateProxy)
    };
}

export default component;