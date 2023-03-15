import {MediaType, MediaProps, ActiveMediaQuery, IsMediaActive, MediaPartial} from '../types';

const mediaByOrder: MediaProps<number> = {
    s: 0,
    m: 1,
    l: 2,
    xl: 3,
    xxl: 4,
    xxxl: 5,
};

export const isMediaActiveFactory =
    (activeType: ActiveMediaQuery): IsMediaActive =>
    (toCheck) => {
        return activeType in mediaByOrder
            ? mediaByOrder[activeType as MediaType] - mediaByOrder[toCheck] >= 0
            : false;
    };

const mediaOrder = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl'] as const;

export const getClosestMediaPropsFactory =
    (currentActive: ActiveMediaQuery) =>
    <T = unknown>(medias: MediaPartial<T> = {}): T | undefined => {
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
