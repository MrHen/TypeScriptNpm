import HenThingy = require('hen-thingy');

module HenWidget {
    export function fiddle(start:number):number {
        return HenThingy.tweak(start) + 10;
    }
}

export = HenWidget;
