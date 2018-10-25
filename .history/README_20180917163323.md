
## Basic usage
```javascript

    let testComp = component((data, states) => {
        return element("div",{},
            element("h1", {text:data.header}),
            element("p", {
                text: data.body,
                style: {
                    lineHeight: "15px"
                }
            }),
            element("a", {
                text: stateValue((states) => {
                    if (states.showSub) {
                        return "hide"
                    } else {
                        return "show"
                    }
                }),
                onClick: (data, states)=>{
                    states.showSub = !state.showSub;
                }
            }),
            stateElement(
                (states) => {
                    if (states.showSub) {
                        return element("p", {
                            text: data.sub
                        });
                    } else {
                        return element("nil");
                    }
                }
            ),
        );
    });

    testComp({
        header: "Hello world!",
        body: "",
        sub: "this is a sub"
    },{showSub: false});
```