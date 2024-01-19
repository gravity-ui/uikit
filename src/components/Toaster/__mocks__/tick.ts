import {act} from '../../../../test-utils/utils';

import {fireAnimationEndEvent} from './fireAnimationEndEvent';

export function tick(el: Node | Window, ms: number) {
    act(() => {
        jest.advanceTimersByTime(ms);
    });
    fireAnimationEndEvent(el, 'toast-hide-end');
}
