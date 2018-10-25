import {Shapes, getShape} from "./shape";

class DataValue {
    constructor(data, accessor, root) {
        this.data = data;
        this.accessor = accessor;
        this.root = root;
        this.bindings = []
    }
}

function makeArrayProxy(data, accessor, root) {

}

function makeComplexProxy(data, accessor, root) {
    return new Proxy(data, {
        get : function(obj, prop) {
            accessor.push(prop);
            return makeDataProxy(obj, accessor, root);
        }
    });
}

function makeDataProxy(data, accessor, root){
    let shape = getShape(data);
    switch(shape) {
        case Shapes.ARRAY:
            return makeArrayProxy(data);
        case Shapes.COMPLEX:
            return makeComplexProxy(data);
        default:
            return new DataValue(data, accessor, root)
    }
}