import * as React from 'react';

import {mergeRefs} from '../../../hooks';

export interface ItemElementRegistry {
    /**
     * Ref-callback строки с кешированной (per id) identity: новый callback
     *  на каждый рендер заставлял бы React отцеплять/прицеплять ref строки
     *  на каждое движение активности
     */
    getItemRefCallback(id: string): React.RefCallback<HTMLElement>;
    /** Живой DOM-элемент строки; undefined, пока строка не смонтирована */
    getElement(id: string): HTMLElement | undefined;
    /** Смонтированные элементы строк — для dev-проверок */
    elements(): Iterable<HTMLElement>;
    /**
     * Кэш форкнутых ref: без него композиция создавала бы новый callback на
     *  каждый рендер, и React дёргал бы ref потребителя null/узел на каждое
     *  движение активности
     */
    forkRefCached(
        base: React.Ref<HTMLElement>,
        override: React.Ref<HTMLElement>,
    ): React.RefCallback<HTMLElement>;
}

/**
 * Реестр DOM-элементов строк и кеши ref-композиции — механика «id ↔ элемент,
 *  стабильные ref», о слоях листа не знающая. Кеш ref-callback'ов чистится
 *  по уходу id из набора строк; сам реестр элементов чистит React, дёргая
 *  callback с null на размонтировании строки
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
