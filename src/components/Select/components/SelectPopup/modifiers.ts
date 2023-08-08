import type {Modifier} from '@popperjs/core';

import {BORDER_WIDTH, POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE} from '../../constants';

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
    width: SelectPopupProps['width'] = 'outfit',
    controlWidth: number,
    virtualized?: boolean,
) => {
    let popupWidth = controlWidth;
    if (typeof width === 'number') {
        popupWidth = width;
    } else if (width === 'fit') {
        popupWidth = adjustBorderWidth(controlWidth);
    } else if (width === 'outfit') {
        popupWidth = getMinWidth(controlWidth, virtualized);
    }

    return `${popupWidth}px`;
};

export const getModifiers = (
    args: Pick<SelectPopupProps, 'width' | 'disablePortal' | 'virtualized'>,
) => {
    const {width = 'outfit', disablePortal, virtualized} = args;

    // set popper width styles according anchor rect
    const sameWidth: Modifier<'sameWidth', {}> = {
        name: 'sameWidth',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({state, name}) => {
            // prevents styles applying after popup being opened (in case of multiple selection)
            if (state.modifiersData[`${name}#persistent`]?.skip) {
                return;
            }

            const popupWidth = getPopupWidth(width, state.rects.reference.width, virtualized);
            if (width === 'outfit') {
                state.styles.popper.minWidth = popupWidth;
                state.styles.popper.width = undefined;
            } else {
                state.styles.popper.minWidth = popupWidth;
                state.styles.popper.width = popupWidth;
            }

            state.styles.popper.maxWidth = `max(90vw, ${adjustBorderWidth(
                state.rects.reference.width,
            )}px)`;

            state.modifiersData[`${name}#persistent`] = {
                skip: typeof width !== 'number',
            };
        },
        effect: ({state, name}) => {
            // All this code is workaround. Check https://popper.js.org/docs/v2/modifiers/community-modifiers/

            // prevents styles applying after popup being opened (in case of multiple selection)
            if (state.modifiersData[`${name}#persistent`]?.skip) {
                return;
            }
            const popupWidth = getPopupWidth(
                width,
                (state.elements.reference as HTMLElement).offsetWidth,
                virtualized,
            );
            if (width === 'outfit') {
                state.elements.popper.style.minWidth = popupWidth;
            } else {
                state.elements.popper.style.minWidth = popupWidth;
                state.elements.popper.style.width = popupWidth;
            }

            state.elements.popper.style.maxWidth = `max(90vw, ${
                (state.elements.reference as HTMLElement).offsetWidth
            }px)`;
        },
    };

    // prevents the popper from being cut off by moving it so that it stays visible within its boundary area
    const preventOverflow: Pick<Modifier<'preventOverflow', {}>, 'name' | 'options'> = {
        name: 'preventOverflow',
        options: {padding: 10, altBoundary: disablePortal, altAxis: true},
    };

    return [sameWidth, preventOverflow];
};
