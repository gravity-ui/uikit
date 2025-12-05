import {CSS_SIZE_EXCEPTION} from '../constants';
import type {
    AdaptiveProp,
    ColSize,
    IsMediaActive,
    MediaPartial,
    MediaProps,
    MediaType,
    Space,
} from '../types';

const mediaByOrder: MediaProps<number> = {
    xs: 0,
    s: 1,
    m: 2,
    l: 3,
    xl: 4,
    xxl: 5,
    xxxl: 6,
};

export const isMediaActiveFactory =
    (activeType: MediaType): IsMediaActive =>
    (toCheck) => {
        return activeType in mediaByOrder
            ? mediaByOrder[activeType as MediaType] - mediaByOrder[toCheck] >= 0
            : false;
    };

const mediaOrder = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const;

export type GetClosestMediaProps = ReturnType<typeof getClosestMediaPropsFactory>;
export const getClosestMediaPropsFactory =
    (currentActive: MediaType) =>
    <T>(prop: AdaptiveProp<T> | undefined): T | undefined => {
        if (prop && typeof prop === 'object' && !Array.isArray(prop)) {
            if (!currentActive) {
                return undefined;
            }

            const medias = prop as MediaPartial<T>;
            let candidate = currentActive;

            while (candidate) {
                if (medias[candidate] !== undefined) {
                    return medias[candidate];
                }

                candidate = mediaOrder[mediaByOrder[candidate] - 1];
            }

            return undefined;
        }
        return prop;
    };

export const makeCssMod = (space: Space | ColSize): string => {
    return space in CSS_SIZE_EXCEPTION ? CSS_SIZE_EXCEPTION[space] : String(space);
};
