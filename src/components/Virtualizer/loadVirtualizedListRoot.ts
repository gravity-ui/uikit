'use client';

import type * as VirtualizedListRoot from './VirtualizedListRoot.js';

type VirtualizedListRootModule = typeof VirtualizedListRoot;

let loadedModule: VirtualizedListRootModule | undefined;
let pendingModule: Promise<VirtualizedListRootModule> | undefined;

/**
 * Loads the root of the virtualized list — and tanstack with it — as a chunk of its own: one
 * request for the lifetime of the page, every call after the first returns the same promise.
 * The CommonJS build loads it with `require` (build-utils/transform-dynamic-import.js); the
 * extension is what the CommonJS build, checked as `nodenext`, asks of a dynamic import
 */
export function loadVirtualizedListRoot(): Promise<VirtualizedListRootModule> {
    if (!pendingModule) {
        pendingModule = import('./VirtualizedListRoot.js').then((module) => {
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
