import { Injectable } from '@angular/core';
import { Clock } from '../../mips/clock/clock';
import Anime from 'animejs/lib/anime.es.js';
import { findClockConfig } from '../../mips/library/config';
import { NullClock } from '../../mips/clock/Null/NullClock';

@Injectable({
    providedIn: 'root',
})
export class SvgService
{
    protected _elements: NodeListOf<Element> = null;
    protected _animationDuration = 3000;
    protected _inactiveOpacity = 0.2;
    protected _opacityKeyframes = [
        { opacity: 1 },
        { opacity: 0.9 },
        { opacity: 0.8 },
        { opacity: 0.7 },
        { opacity: 0.6 },
        { opacity: 0.5 },
        { opacity: 0.4 },
        { opacity: 0.3 },
        { opacity: 0.2 },
    ];
    protected _activeClock: Clock = new NullClock();

    public visualiseClock (clock: Clock)
    {
        this._activeClock = clock;
        const clockConfig = findClockConfig(clock);

        // Reduce opacity of all elements.
        Anime({ targets: this._elements, opacity: this._inactiveOpacity });

        // Fade in focused elements.
        Anime({ targets: this.findElements(clockConfig.focus), keyframes: this._opacityKeyframes.reverse(), duration: this._animationDuration });
    }

    public set elements (values: NodeListOf<Element>)
    {
        this._elements = values;
        Anime({ targets: values, opacity: this._inactiveOpacity });
    }

    protected findElements (ids: any[]): NodeListOf<Element>
    {
        return document.querySelectorAll(ids.map(it => {
            return parseInt(it, 10) ? `[id="${it}"]` : `#${it}`;
        }).join(','));
    }
}
