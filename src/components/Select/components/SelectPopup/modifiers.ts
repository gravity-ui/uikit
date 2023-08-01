import type {Modifier} from '@popperjs/core';

import {BORDER_WIDTH, POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE, POPUP_WIDTH_MODE} from '../../constants';

import type {SelectPopupProps} from './types';

const adjustBorderWidth = (width: number) => {
    return width - BORDER_WIDTH * 2;
};

const getMinWidth = (referenceWidth: number, virtualized?: boolean) => {
    if (virtualized) {
        return referenceWidth > POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE
            ? referenceWidth
            : POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE;
    }

    return adjustBorderWidth(referenceWidth);
};

const getPopupWidth = (
    width: string | number = POPUP_WIDTH_MODE.OUTFIT,
    controlWidth: number,
    virtualized?: boolean,
) => {
    let popupWidth = controlWidth;
    if (typeof width === 'number') {
        popupWidth = width;
    } else if (width === POPUP_WIDTH_MODE.FIT) {
        popupWidth = adjustBorderWidth(controlWidth);
    } else if (width === POPUP_WIDTH_MODE.OUTFIT) {
        popupWidth = getMinWidth(controlWidth, virtualized);
    }

    return `${popupWidth}px`;
};

export const getModifiers = (
    args: Pick<SelectPopupProps, 'width' | 'disablePortal' | 'virtualized'>,
) => {
    const {width = POPUP_WIDTH_MODE.OUTFIT, disablePortal, virtualized} = args;

    // set popper width styles according anchor rect
    const sameWidth: Modifier<'sameWidth', {}> = {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({state}) => {
            // prevents styles applying after popup being opened (in case of multiple selection)
            if (state.styles.popper.minWidth || state.styles.popper.width) return;

            const styleField = width === POPUP_WIDTH_MODE.OUTFIT ? 'minWidth' : 'width';
            const popupWidth = getPopupWidth(width, state.rects.reference.width, virtualized);
            state.styles.popper[styleField] = popupWidth;
        },
        effect: ({state}) => {
            // prevents styles applying after popup being opened (in case of multiple selection)
            if (state.elements.popper.style.minWidth || state.elements.popper.style.width) return;

            const styleField = width === POPUP_WIDTH_MODE.OUTFIT ? 'minWidth' : 'width';
            const popupWidth = getPopupWidth(
                width,
                (state.elements.reference as HTMLElement).offsetWidth,
                virtualized,
            );
            state.elements.popper.style[styleField] = popupWidth;
        },
    };

    // prevents the popper from being cut off by moving it so that it stays visible within its boundary area
    const preventOverflow: Pick<Modifier<'preventOverflow', {}>, 'name' | 'options'> = {
        name: 'preventOverflow',
        options: {padding: 10, altBoundary: disablePortal, altAxis: true},
    };

    return [sameWidth, preventOverflow];
};
