'use client';

import * as React from 'react';

import {useDirection} from '../../../theme';

import type {VisibilityMap} from './types';

export const OBSERVER_TARGET_ATTR = 'data-observer-id';
const GAP = 4;

export const useObserveIntersection = (updateObserveKey: string) => {
    const direction = useDirection();
    const parentRef = React.useRef<HTMLDivElement>(null);
    const [visibilityMap, setVisibilityMap] = React.useState<VisibilityMap>({});
    const [offset, setOffset] = React.useState(0);

    const handleIntersection = React.useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const updatedEntries: VisibilityMap = {};
            let newOffest = 0;
            let lastVisibleEntry: IntersectionObserverEntry | undefined;
            let firstInvisible: IntersectionObserverEntry | undefined;
            entries.forEach((entry) => {
                const targetId = entry.target.getAttribute(OBSERVER_TARGET_ATTR);
                if (!targetId) {
                    return;
                }
                if (entry.isIntersecting) {
                    lastVisibleEntry = entry;
                    updatedEntries[targetId] = true;
                } else {
                    if (!firstInvisible) {
                        firstInvisible = entry;
                    }
                    updatedEntries[targetId] = false;
                }
            });

            const parentRect = parentRef.current?.getBoundingClientRect();

            if (parentRect && firstInvisible) {
                const rect = firstInvisible.target.getBoundingClientRect();
                newOffest =
                    direction === 'ltr'
                        ? rect.left - parentRect.left
                        : parentRect.right - rect.right;
            } else if (parentRect && lastVisibleEntry) {
                const rect = lastVisibleEntry.target.getBoundingClientRect();
                newOffest =
                    direction === 'ltr'
                        ? rect.right - parentRect.left + GAP
                        : parentRect.right - rect.left + GAP;
            }

            setVisibilityMap((prev) => ({
                ...prev,
                ...updatedEntries,
            }));

            setOffset(newOffest);
        },
        [direction],
    );

    React.useEffect(() => {
        setVisibilityMap({});

        const observer = new IntersectionObserver(handleIntersection, {
            root: parentRef.current,
            threshold: 1,
        });

        Array.from(parentRef.current?.children || []).forEach((item) => {
            if (item.hasAttribute(OBSERVER_TARGET_ATTR)) {
                observer.observe(item);
            }
        });

        return () => observer.disconnect();
    }, [handleIntersection, updateObserveKey]);

    return {parentRef, visibilityMap, offset};
};
