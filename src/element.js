import {Shapes, getShape} from "./shape";
import {DataValue} from "./data";

function toCssName (key) {
    for(let i = 0; i < key.length; i+=1) {
        if (key[i] === key[i].toUpperCase()) {
            return `${key.substring(0, i)}-${
                toCssName( 
                    key[i].toLowerCase() + key.substring(i + 1, key.length))}`;
        }
    }
    return key;
}

function style (styleObject) {
    let style = 
        Object.keys(styleObject).map((key)=>{
            const item = toCssName(key);
            return `${item}:${styleObject[key]}`;
        });
    return style.join(";");
}
/*
* element(nodeName, [attrs], children...)
* element(component, data, states)
*/

function element () {
    if (arguments.length === 0) {
        throw Error("Element should take at least one argument for tagName or a component function");
    }
    // this first argument can be a name of HTML/SVG tag
    // or a component
    let node = null;
    if (typeof arguments[0] === "string") {
        node = document.createElement(arguments[0]);
    } 
    else if (typeof arguments[0] === "function") {
        node = arguments[0](arguments[1], arguments[2]);
    }
    // the second argument is optional
    if (arguments.length >= 2) {
        let childrenStartIndex = 1;
        const argument1Shape = getShape(arguments[1]);
        if (argument1Shape === Shapes.COMPLEX) {
            // this is a attr dict
            childrenStartIndex = 2;

            Object.keys(arguments[1]).forEach((attrKey)=>{
                const data = arguments[1][attrKey];
                let value = data;
                if (data instanceof DataValue) {
                    value = data.value;
                }
                if (attrKey === "text") {
                    
                } else if (key === "on"){
                    
                } else if (key === "style") {
                    node.setAttribute("style", style(value));
                } else {
                    this.dom.setAttribute(key, value);
                }
            });
        }
    }

    return node;
}