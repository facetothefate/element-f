import {Shapes, getShape} from "./shape";

function makeArrayProxy(data, accessor, root) {

}

function makeComplexProxy(data, accessor, root) {
    return new Proxy(data, {
        get : function(obj, prop){
            return makeDataProxy(obj);
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
            return {
                data:data, 
                accessor:accessor,
                root: root,
                bindings: []
            };
    }
}