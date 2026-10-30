'use client';

import * as React from 'react';

import {Platform} from '../../mobile';
import type {History, Location} from '../../mobile';

let hashHistory: string[] = [];

export interface UseSheetHashProps {
    /** Sheet id used as the URL hash. */
    id: string;
    /** Current mobile platform. */
    platform: Platform;
    /** History object from the mobile context. */
    history: History;
    /** Location object from the mobile context. */
    location: Location;
}

export interface UseSheetHashResult {
    /** Pushes/replaces the sheet hash into the history depending on the platform. */
    setHash: () => void;
    /** Removes the sheet hash from the history depending on the platform. */
    removeHash: () => void;
    /** Returns whether the sheet should close in response to a history POP. */
    shouldClose: (prevLocation: Location) => boolean;
    /** Resets the accumulated hash history (e.g. on pathname change). */
    resetHashHistory: () => void;
}

function resetHashHistory() {
    hashHistory = [];
}

const browserHashHandlers: UseSheetHashResult = {
    setHash: () => {},
    removeHash: () => {},
    shouldClose: () => false,
    resetHashHistory,
};

export function useSheetHash({
    id,
    platform,
    history,
    location,
}: UseSheetHashProps): UseSheetHashResult {
    const {action, replace, push, goBack} = history;
    const {hash, pathname, search} = location;

    const setHash = React.useCallback(() => {
        const newLocation = {pathname, search, hash: id};

        switch (platform) {
            case Platform.IOS:
                if (hash) {
                    hashHistory.push(hash);
                }
                replace(newLocation);
                break;
            case Platform.ANDROID:
                push(newLocation);
                break;
        }
    }, [hash, id, pathname, platform, push, replace, search]);

    const removeHash = React.useCallback(() => {
        if (hash !== `#${id}`) {
            return;
        }

        switch (platform) {
            case Platform.IOS:
                replace({pathname, search, hash: hashHistory.pop() ?? ''});
                break;
            case Platform.ANDROID:
                goBack();
                break;
        }
    }, [goBack, hash, id, pathname, platform, replace, search]);

    const shouldClose = React.useCallback(
        (prevLocation: Location) =>
            action === 'POP' && prevLocation.hash !== hash && hash !== `#${id}`,
        [action, hash, id],
    );

    if (platform === Platform.BROWSER) {
        return browserHashHandlers;
    }

    return {setHash, removeHash, shouldClose, resetHashHistory};
}
