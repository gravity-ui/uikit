import {screen} from '@testing-library/react';

import {fireAnimationEndEvent} from './fireAnimationEndEvent';

export function getToast() {
    const toastHeading = screen.getByRole('heading', {name: 'Test Toast'});
    // TODO Improve toast a11y to correctly select it
    // eslint-disable-next-line testing-library/no-node-access
    const toast = toastHeading.parentNode?.parentElement;

    if (!toast) {
        throw new Error('Toast expected to be in document.');
    }

    fireAnimationEndEvent(toast, 'toast-display-end');

    return toast;
}

export function getToastAction() {
    const toastAction = screen.getByRole('button', {name: 'Toast Button'});
    // TODO Improve toast a11y to correctly select it
    // eslint-disable-next-line testing-library/no-node-access

    if (!toastAction) {
        throw new Error('Toast action expected to be in document.');
    }

    return toastAction;
}
