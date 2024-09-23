import React from 'react';

import type {VisibilityMap} from './types';

export const OBSERVER_TARGET_ATTR = 'data-observer-id';
const GAP = 8;

export const useObserveIntersection = (updateObserveKey: string) => {
    const parentRef = React.useRef<HTMLDivElement>(null);
    const [visibilityMap, setVisibilityMap] = React.useState<VisibilityMap>({});
    const [offset, setOffset] = React.useState(0);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
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
            newOffest = rect.left - parentRect.left;
        } else if (parentRect && lastVisibleEntry) {
            const rect = lastVisibleEntry.target.getBoundingClientRect();
            newOffest = rect.right - parentRect.left + GAP;
        }

        setVisibilityMap((prev) => ({
            ...prev,
            ...updatedEntries,
        }));

        setOffset(newOffest);
    };

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
    }, [updateObserveKey]);

    return {parentRef, visibilityMap, offset};
};
