import {CSS_SIZE_EXCEPTION} from '../constants';
import type {ColSize, IsMediaActive, MediaPartial, MediaProps, MediaType, Space} from '../types';

const mediaByOrder: MediaProps<number> = {
    xs: 0,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
    '2xl': 5,
    '3xl': 6,
};

export const isMediaActiveFactory =
    (activeType: MediaType): IsMediaActive =>
    (toCheck) => {
        return activeType in mediaByOrder
            ? mediaByOrder[activeType as MediaType] - mediaByOrder[toCheck] >= 0
            : false;
    };

const mediaOrder = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl'] as const;

export const getClosestMediaPropsFactory =
    (currentActive: MediaType) =>
    <T>(medias: MediaPartial<T> = {}): T | undefined => {
        if (!currentActive) {
            return undefined;
        }

        let candidate = currentActive;

        while (candidate) {
            if (typeof medias[candidate] !== 'undefined') {
                return medias[candidate];
            }

            candidate = mediaOrder[mediaByOrder[candidate] - 1];
        }

        return undefined;
    };

export const makeCssMod = (space: Space | ColSize): string => {
    return space in CSS_SIZE_EXCEPTION ? CSS_SIZE_EXCEPTION[space] : String(space);
};
