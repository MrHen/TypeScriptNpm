module HenCircle {
    export function tweak(start:number):number {
        var HenDoodad = require('hen-doodad');

        return HenDoodad.bump(start) + 2;
    }
}

export = HenCircle;
