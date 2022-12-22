import React from 'react';

interface SkeletonGroupContextValue {
    add: (ref: React.RefObject<HTMLElement>) => void;
    remove: (ref: React.RefObject<HTMLElement>) => void;
}

export const SkeletonGroupContext = React.createContext<SkeletonGroupContextValue>({
    add: () => {},
    remove: () => {},
});

export function SkeletonGroup({children}: React.PropsWithChildren<{}>) {
    const skeletonRefs = React.useRef<React.RefObject<HTMLElement>[]>([]);

    React.useEffect(() => {
        if (skeletonRefs.current.length === 0) {
            return;
        }

        const clientRects: DOMRect[] = [];

        const skeletons: HTMLElement[] = skeletonRefs.current
            .map((ref) => ref.current!)
            .filter(Boolean);

        let skeletonAreaLeft = Infinity;
        let skeletonAreaTop = Infinity;
        let skeletonAreaRight = 0;
        let skeletonAreaBottom = 0;

        skeletons.forEach((elem) => {
            const rect = elem.getBoundingClientRect();
            skeletonAreaLeft = Math.min(skeletonAreaLeft, rect.left);
            skeletonAreaTop = Math.min(skeletonAreaTop, rect.top);
            skeletonAreaRight = Math.max(skeletonAreaRight, rect.right);
            skeletonAreaBottom = Math.max(skeletonAreaBottom, rect.bottom);
            clientRects.push(rect);
        });
        skeletons.forEach((elem, i) => {
            elem.style.setProperty('--cover-width', `${skeletonAreaRight - skeletonAreaLeft}px`);
            elem.style.setProperty('--cover-height', `${skeletonAreaBottom - skeletonAreaTop}px`);
            elem.style.setProperty('--cover-top', `${skeletonAreaTop - clientRects[i].top}px`);
            elem.style.setProperty('--cover-left', `${skeletonAreaLeft - clientRects[i].left}px`);
        });
    }, []);

    const contextValue = React.useMemo<SkeletonGroupContextValue>(() => {
        return {
            add: (ref) => {
                skeletonRefs.current = [...skeletonRefs.current, ref];
            },
            remove: (ref) => {
                skeletonRefs.current = skeletonRefs.current.filter((curRef) => curRef !== ref);
            },
        };
    }, []);

    return (
        <SkeletonGroupContext.Provider value={contextValue}>
            {children}
        </SkeletonGroupContext.Provider>
    );
}

export function useSkeletonGroup(ref: React.RefObject<HTMLElement>) {
    const context = React.useContext(SkeletonGroupContext);

    React.useEffect(() => {
        context.add(ref);
        return () => context.remove(ref);
    }, [context, ref]);
}
