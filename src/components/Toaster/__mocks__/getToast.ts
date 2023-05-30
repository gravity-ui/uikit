import {screen} from '@testing-library/react';

import {fireAnimationEndEvent} from './fireAnimationEndEvent';

export function getToast() {
    const toastHeading = screen.getByRole('heading', {name: 'Test Toast'});
    // TODO Improve toast a11y to correctly select it
    // eslint-disable-next-line testing-library/no-node-access
    const toast = toastHeading.parentNode?.parentNode;

    if (!toast) {
        throw new Error('Toast expected to be in document.');
    }

    fireAnimationEndEvent(toast, 'toast-display-end');

    return toast;
}
