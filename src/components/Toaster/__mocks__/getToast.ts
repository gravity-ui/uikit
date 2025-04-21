import {screen} from '../../../../test-utils/utils';

import {fireAnimationEndEvent} from './fireAnimationEndEvent';

export function getToast() {
    const toastHeading = screen.getByRole('heading', {name: 'Test Toast'});
    // TODO Improve toast a11y to correctly select it
    const toast = toastHeading.parentNode?.parentElement;

    if (!toast) {
        throw new Error('Toast expected to be in document.');
    }

    fireAnimationEndEvent(toast, 'toast-display-end');

    return toast;
}
