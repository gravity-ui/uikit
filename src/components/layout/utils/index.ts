import {CSS_SIZE_EXCEPTION} from '../constants';
import type {ColSize, IsMediaActive, MediaPartial, MediaProps, MediaType, Space} from '../types';

const mediaByOrder: MediaProps<number> = {
    s: 0,
    m: 1,
    l: 2,
    xl: 3,
    xxl: 4,
    xxxl: 5,
};

export const isMediaActiveFactory =
    (activeType: MediaType): IsMediaActive =>
    (toCheck) => {
        return activeType in mediaByOrder
            ? mediaByOrder[activeType as MediaType] - mediaByOrder[toCheck] >= 0
            : false;
    };

const mediaOrder = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const;

export const getClosestMediaPropsFactory =
    (currentActive: MediaType) =>
    <T>(medias: MediaPartial<T> = {}): T | undefined => {
        if (!currentActive) {
            return undefined;
        }

        let candidate = currentActive;

        while (candidate) {
            if (medias[candidate]) {
                return medias[candidate];
            }

            candidate = mediaOrder[mediaByOrder[candidate] - 1];
        }

        return undefined;
    };

export const makeCssMod = (space: Space | ColSize): string => {
    return space in CSS_SIZE_EXCEPTION ? CSS_SIZE_EXCEPTION[space] : String(space);
};
