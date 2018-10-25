import {Shapes, getShape} from "./shape";

// DataValue is a factor, need implement map function
class DataValueFactor {
    constructor(value, root, bindings) {
        this.value = value;
        this.root = root;

        // bindings is an array of binding functions
        // element function should add binding function to it
        this.bindings = bindings;

    }
    valueOf() {
        return this.value;
    }

    map(fn) {
        return new DataValueFactor(fn(value),this.root, this.bindings);
    }
}

function makeDataValueFactor(value, root, bindings) {
    return new DataValueFactor(value, root, bindings)
}


function makeArrayProxy(data, root) {

}

function makeComplexProxy(data, root) {
    return new Proxy(data, {
        get (obj, prop) {
            if (!this.content) {
                this.content = {};
            }
            if (!this.content[prop]) {
                this.content[prop] = makeDataProxy(obj, root);
            }
            return this.content[prop];
        },
        set (obj, prop, value) {
            if (!this.content) {
                this.content = {};
                obj[prop] = value;
                return;
            }

            if (!this.content[prop]) {
                obj[prop] = value;
                return;
            }

            if (this.content[prop] instanceof DataValueFactor) {
                let newData = value;

                // we may also get a data from other data model
                if (value instanceof DataValueFactor) {
                    newData = value.data;
                }

                let dataValueFactor = this.content[prop]
                dataValueFactor.data = newData;
                dataValueFactor.bindings.forEach(element => {
                    element(newData);
                });

            } else if (this.content[prop] instanceof Proxy) {
                // we are totaly change everything here
                // Thing can happen like following:
                // Original:
                // let test = { a: {foo:"123", bar:"123"}}
                // Change to:
                // test.a = {foo:"123", bar:"456"}
                // in this case, it should equal to
                // test.a.bar = "456"
                //
                // Or we introduce some new keys 
                // e.g.
                // test.a = {c:"123", d:"456"}
                // 
                // Or we diectly change the shape of the data
                // e.g.
                // test.a = []
                // in those cases, it will make us loosing the bindings


            } else {
                // this should never happen
                return
            }
        }
    });
}

function makeDataProxy(data, root){
    let shape = getShape(data);
    switch(shape) {
        case Shapes.ARRAY:
            return makeArrayProxy(data);
        case Shapes.COMPLEX:
            return makeComplexProxy(data);
        default:
            return new DataValueFactor(data, root);
    }
}

export {DataValueFactor, makeDataProxy}
