import {createEvent, fireEvent} from '../../../../test-utils/utils';

export function fireAnimationEndEvent(el: Node | Window, animationName: string) {
    const ev = createEvent.animationEnd(el, {animationName});
    Object.assign(ev, {
        animationName,
    });

    fireEvent(el, ev);
}
