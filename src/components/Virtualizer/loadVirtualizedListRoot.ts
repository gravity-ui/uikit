'use client';

import type * as VirtualizedListRoot from './VirtualizedListRoot';

type VirtualizedListRootModule = typeof VirtualizedListRoot;

/**
 * The waits before the second and the third request of a chunk that failed to load. The retries
 * belong here: React.lazy keeps a rejection for good, and a new lazy root per render would loop
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
 * Loads the root, tanstack included, as a chunk of its own: one promise for the page, a failed
 * request repeated twice. CommonJS loads it with `require` (build-utils/transform-dynamic-import.js);
 * `nodenext` asks for the extension
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
