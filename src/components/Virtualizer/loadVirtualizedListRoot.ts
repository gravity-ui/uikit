'use client';

import type * as VirtualizedListRoot from './VirtualizedListRoot';

type VirtualizedListRootModule = typeof VirtualizedListRoot;

let loadedModule: VirtualizedListRootModule | undefined;
let pendingModule: Promise<VirtualizedListRootModule> | undefined;

/**
 * Loads the root, tanstack included, as a chunk of its own: one promise for the page. CommonJS loads
 * it with `require` (build-utils/transform-dynamic-import.js); `nodenext` asks for the extension
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
