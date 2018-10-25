import {Shapes, getShape} from "./shape";

function makeArrayProxy(data) {

}

function makeComplexProxy(data) {
    return new Proxy(data, {
        get : function(obj, prop){
            
        }
    });
}

function makeDataProxy(data){
    let shape = getShape(data);
    switch(shape) {
        case Shapes.ARRAY:
            return makeArrayProxy(data);
        case Shapes.COMPLEX:
            return makeComplexProxy(data);
        default:
            return data;
    }
}