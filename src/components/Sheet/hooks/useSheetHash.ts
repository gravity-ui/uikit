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

export function useSheetHash({
    id,
    platform,
    history,
    location,
}: UseSheetHashProps): UseSheetHashResult {
    const latestRef = React.useRef({id, platform, history, location});
    latestRef.current = {id, platform, history, location};

    const setHash = React.useCallback(() => {
        const {
            id: currentId,
            platform: currentPlatform,
            history: currentHistory,
            location: currentLocation,
        } = latestRef.current;

        if (currentPlatform === Platform.BROWSER) {
            return;
        }

        const newLocation = {...currentLocation, hash: currentId};

        switch (currentPlatform) {
            case Platform.IOS:
                if (currentLocation.hash) {
                    hashHistory.push(currentLocation.hash);
                }
                currentHistory.replace(newLocation);
                break;
            case Platform.ANDROID:
                currentHistory.push(newLocation);
                break;
        }
    }, []);

    const removeHash = React.useCallback(() => {
        const {
            id: currentId,
            platform: currentPlatform,
            history: currentHistory,
            location: currentLocation,
        } = latestRef.current;

        if (currentPlatform === Platform.BROWSER || currentLocation.hash !== `#${currentId}`) {
            return;
        }

        switch (currentPlatform) {
            case Platform.IOS:
                currentHistory.replace({...currentLocation, hash: hashHistory.pop() ?? ''});
                break;
            case Platform.ANDROID:
                currentHistory.goBack();
                break;
        }
    }, []);

    const shouldClose = React.useCallback((prevLocation: Location) => {
        const {
            id: currentId,
            platform: currentPlatform,
            history: currentHistory,
            location: currentLocation,
        } = latestRef.current;

        return (
            currentPlatform !== Platform.BROWSER &&
            currentHistory.action === 'POP' &&
            prevLocation.hash !== currentLocation.hash &&
            currentLocation.hash !== `#${currentId}`
        );
    }, []);

    const resetHashHistory = React.useCallback(() => {
        hashHistory = [];
    }, []);

    return {setHash, removeHash, shouldClose, resetHashHistory};
}
