import HenCircle = require('hen-circle');
import HenThingy = require('hen-thingy');

module HenDoodad {
    export function fiddle(start:number):number {
        return HenThingy.tweak(start) + HenCircle.tweak(start);
    }

    export function bump(start:number):number {
        return HenThingy.tweak(start);
    }
}

export = HenDoodad;
