import HenThingy = require('hen-thingy');

module HenDoodad {
    export function fiddle(start:number):number {
        return HenThingy.tweak(start) + 20;
    }
}

export = HenDoodad;
