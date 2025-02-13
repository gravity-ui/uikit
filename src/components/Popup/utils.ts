import {autoPlacement, flip} from '@floating-ui/react';
import type {Alignment, Middleware, Placement} from '@floating-ui/react';

import {ARROW_SIZE, AUTO_PLACEMENTS, OVERFLOW_PADDING} from './constants';
import type {AutoPlacement, PopupOffset, PopupPlacement} from './types';

export function getOffsetOptions(offsetProp: PopupOffset, hasArrow: boolean | undefined) {
    let offset = offsetProp;
    if (hasArrow) {
        if (typeof offset === 'number') {
            offset += ARROW_SIZE;
        } else {
            offset = {...offset, mainAxis: (offset.mainAxis ?? 0) + ARROW_SIZE};
        }
    }

    return {offset};
}

function isAutoPlacement(placement?: string): placement is AutoPlacement {
    return Boolean(placement && AUTO_PLACEMENTS.includes(placement as AutoPlacement));
}

export function getPlacementOptions(placementProp?: PopupPlacement, disablePortal?: boolean) {
    let placement: Placement | undefined;
    let middleware: Middleware;

    if (Array.isArray(placementProp)) {
        placement = placementProp[0];
        middleware = flip({
            padding: OVERFLOW_PADDING,
            altBoundary: disablePortal,
            fallbackPlacements: placementProp.slice(1),
        });
    } else if (isAutoPlacement(placementProp)) {
        let alignment: Alignment | undefined;
        if (placementProp === 'auto-start') {
            alignment = 'start';
        } else if (placementProp === 'auto-end') {
            alignment = 'end';
        }

        placement = undefined;
        middleware = autoPlacement({
            padding: OVERFLOW_PADDING,
            altBoundary: disablePortal,
            alignment,
        });
    } else {
        let fallbackAxisSideDirection;

        if (placementProp?.startsWith('top') || placementProp?.startsWith('left')) {
            fallbackAxisSideDirection = 'start' as const;
        } else {
            fallbackAxisSideDirection = 'end' as const;
        }

        placement = placementProp;
        middleware = flip({
            padding: OVERFLOW_PADDING,
            altBoundary: disablePortal,
            fallbackAxisSideDirection,
        });
    }

    return {placement, middleware};
}

export const arrowStylesMiddleware = (): Middleware => ({
    name: 'arrowStyles',
    fn({middlewareData}) {
        if (!middlewareData.arrow) {
            return {};
        }

        return {
            data: {
                left: middlewareData.arrow.x,
                top: middlewareData.arrow.y,
            },
        };
    },
});
