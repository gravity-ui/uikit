import * as React from 'react';

import {mergeRefs} from '../../../hooks';

export interface ItemElementRegistry {
    /**
     * The ref callback of a row, with an identity cached per id: a new
     *  callback on every render would make React detach and re-attach the ref
     *  of the row on every move of the activity
     */
    getItemRefCallback(id: string): React.RefCallback<HTMLElement>;
    /** The live DOM element of a row; undefined while the row is not mounted */
    getElement(id: string): HTMLElement | undefined;
    /** The mounted row elements — for dev checks */
    elements(): Iterable<HTMLElement>;
    /**
     * The cache of forked refs: without it the composition would create a new
     *  callback on every render, and React would call the consumer's ref with
     *  null and then with the node on every move of the activity
     */
    forkRefCached(
        base: React.Ref<HTMLElement>,
        override: React.Ref<HTMLElement>,
    ): React.RefCallback<HTMLElement>;
}

/**
 * The registry of row DOM elements and the caches of ref composition — the
 *  "id ↔ element, stable refs" machinery, which knows nothing about the layers
 *  of the list. The cache of ref callbacks is cleaned up when an id leaves the
 *  set of rows; the element registry itself is cleaned up by React, which
 *  calls the callback with null when a row unmounts
 */
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
