import type {Modifier} from '@popperjs/core';
import {BORDER_WIDTH, POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE} from '../../constants';
import type {SelectPopupProps} from './types';

const getMinWidth = (referenceWidth: number, virtualized?: boolean) => {
    if (virtualized) {
        return referenceWidth > POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE
            ? referenceWidth
            : POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE;
    }

    return referenceWidth - BORDER_WIDTH * 2;
};

export const getModifiers = (
    args: Pick<SelectPopupProps, 'width' | 'disablePortal' | 'virtualized'>,
) => {
    const {width, disablePortal, virtualized} = args;

    // set popper width styles according anchor rect
    const sameWidth: Modifier<'sameWidth', {}> = {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({state}) => {
            // prevents styles applying after popup being opened (in case of multiple selection)
            if (!state.attributes.popper['data-width-set']) {
                const minWidth = getMinWidth(state.rects.reference.width, virtualized);
                state.attributes.popper['data-width-set'] = true;
                state.styles.popper.minWidth = `${minWidth}px`;
            }

            if (typeof width === 'number') {
                state.styles.popper.width = `${width}px`;
            }
        },
    };

    // prevents the popper from being cut off by moving it so that it stays visible within its boundary area
    const preventOverflow: Pick<Modifier<'preventOverflow', {}>, 'name' | 'options'> = {
        name: 'preventOverflow',
        options: {padding: 10, altBoundary: disablePortal, altAxis: true},
    };

    return [sameWidth, preventOverflow];
};
