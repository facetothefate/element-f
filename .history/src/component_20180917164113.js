function component(renderFunc) {
    return (data, states) => {
        let dataProxy = makeDataProxy(data);
        let stateProxy = makeStateProxy(state);
        return renderFunc(dataProxy, stateProxy)
    };
}