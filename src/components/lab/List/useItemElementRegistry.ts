import * as React from 'react';

import {mergeRefs} from '../../../hooks';

export interface ItemElementRegistry {
    /** Cached per id: a new callback would detach/attach the ref every render */
    getItemRefCallback(id: string): React.RefCallback<HTMLElement>;
    /** The live DOM element of a row; undefined while the row is not mounted */
    getElement(id: string): HTMLElement | undefined;
    /** The mounted row elements — for dev checks */
    elements(): Iterable<HTMLElement>;
    /** Cache of forked refs: a fresh fork every render would re-run the consumer's ref with null and the node */
    forkRefCached(
        base: React.Ref<HTMLElement>,
        override: React.Ref<HTMLElement>,
    ): React.RefCallback<HTMLElement>;
}

/** id ↔ element registry and ref-composition caches */
export function useItemElementRegistry({
    rowById,
}: {
    rowById: ReadonlyMap<string, unknown>;
}): ItemElementRegistry {
    const elementsRef = React.useRef(new Map<string, HTMLElement>());
    const refCallbacksRef = React.useRef(new Map<string, React.RefCallback<HTMLElement>>());
    const forkedRefsRef = React.useRef(
        new WeakMap<object, WeakMap<object, React.RefCallback<HTMLElement>>>(),
    );

    React.useEffect(() => {
        for (const id of refCallbacksRef.current.keys()) {
            if (!rowById.has(id)) {
                refCallbacksRef.current.delete(id);
            }
        }
    }, [rowById]);

    const [registry] = React.useState<ItemElementRegistry>(() => ({
        getItemRefCallback(id) {
            let refCallback = refCallbacksRef.current.get(id);
            if (!refCallback) {
                refCallback = (element) => {
                    if (element) {
                        elementsRef.current.set(id, element);
                    } else {
                        elementsRef.current.delete(id);
                    }
                };
                refCallbacksRef.current.set(id, refCallback);
            }
            return refCallback;
        },
        getElement: (id) => elementsRef.current.get(id),
        elements: () => elementsRef.current.values(),
        forkRefCached(base, override) {
            let byOverride = forkedRefsRef.current.get(base as object);
            if (!byOverride) {
                byOverride = new WeakMap();
                forkedRefsRef.current.set(base as object, byOverride);
            }
            let forked = byOverride.get(override as object);
            if (!forked) {
                forked = mergeRefs(base, override);
                byOverride.set(override as object, forked);
            }
            return forked;
        },
    }));

    return registry;
}
