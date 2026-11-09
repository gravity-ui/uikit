import {flip, offset as floatingOffset, limitShift, shift, size} from '@floating-ui/react';
import type {Middleware} from '@floating-ui/react';

import {FLOATING_OFFSET} from '../Popup/constants';

export const BORDER_WIDTH = 1;
const POPUP_MIN_WIDTH_IN_VIRTUALIZE_CASE = 100;

interface PopupMiddlewareOptions {
    width?: 'fit' | number;
    disablePortal?: boolean;
    virtualized?: boolean;
}

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
    width: PopupMiddlewareOptions['width'],
    controlWidth: number,
    virtualized?: boolean,
) => {
    let popupWidth = controlWidth;
    if (typeof width === 'number') {
        popupWidth = width;
    } else if (width === 'fit') {
        popupWidth = adjustBorderWidth(controlWidth);
    } else {
        popupWidth = getMinWidth(controlWidth, virtualized);
    }

    return `${popupWidth}px`;
};

export function sameWidthMiddleware(args: PopupMiddlewareOptions): Middleware {
    const {width, virtualized} = args;

    return size({
        apply(state) {
            const skip =
                typeof width !== 'number' && Boolean(state.elements.floating.style.maxWidth);

            if (skip) {
                return;
            }

            const popupWidth = getPopupWidth(width, state.rects.reference.width, virtualized);
            const floatingStyle: Record<string, unknown> = {};

            if (typeof width !== 'number' && width !== 'fit') {
                floatingStyle.minWidth = popupWidth;
                floatingStyle.width = undefined;
            } else {
                floatingStyle.minWidth = popupWidth;
                floatingStyle.width = popupWidth;
            }

            floatingStyle.maxWidth = `max(90vw, ${adjustBorderWidth(
                state.rects.reference.width,
            )}px)`;

            Object.assign(state.elements.floating.style, floatingStyle);
        },
    });
}

export function getMiddlewares(args: PopupMiddlewareOptions): Middleware[] {
    return [
        floatingOffset({mainAxis: FLOATING_OFFSET, crossAxis: BORDER_WIDTH}),
        flip({altBoundary: args.disablePortal}),
        shift({
            limiter: limitShift(),
            crossAxis: true,
            padding: 10,
            altBoundary: args.disablePortal,
        }),
        sameWidthMiddleware(args),
    ];
}
