import ThingyHelper = require('./ThingyHelper');

module HenThingy {
    export function tweak(start:number):number {
        return ThingyHelper(start);
    }
}

export = HenThingy;
