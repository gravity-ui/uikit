'use client';

import type * as VirtualizedListRoot from './VirtualizedListRoot';

type VirtualizedListRootModule = typeof VirtualizedListRoot;

/**
 * The waits before the second and the third request of a chunk that failed to load: a dropped
 * connection or a busy server often lets it through a moment later. A loop of new requests on every
 * render is what React.lazy would get instead — its rejection is kept for good, so the attempts
 * belong here, before it sees one
 */
const RETRY_DELAYS = [500, 2000];

let loadedModule: VirtualizedListRootModule | undefined;
let pendingModule: Promise<VirtualizedListRootModule> | undefined;

function importRoot(retryDelays: readonly number[]): Promise<VirtualizedListRootModule> {
    return import('./VirtualizedListRoot.js').catch((error: unknown) => {
        const [delay, ...nextDelays] = retryDelays;
        if (delay === undefined) {
            throw error;
        }
        return new Promise<void>((resolve) => {
            setTimeout(resolve, delay);
        }).then(() => importRoot(nextDelays));
    });
}

/**
 * Loads the root of the virtualized list — and tanstack with it — as a chunk of its own: one
 * request for the lifetime of the page, every call after the first returns the same promise. A
 * request that fails is repeated twice; if the last one fails too, the promise rejects and the error
 * reaches the error boundary of the list that renders the root.
 * The CommonJS build loads it with `require` (build-utils/transform-dynamic-import.js); the
 * extension is what the CommonJS build, checked as `nodenext`, asks of a dynamic import
 */
export function loadVirtualizedListRoot(): Promise<VirtualizedListRootModule> {
    if (!pendingModule) {
        pendingModule = importRoot(RETRY_DELAYS).then((module) => {
            loadedModule = module;
            return module;
        });
    }
    return pendingModule;
}

/** The module once it has loaded, for a synchronous render; `undefined` until then */
export function getLoadedVirtualizedListRoot(): VirtualizedListRootModule | undefined {
    return loadedModule;
}
