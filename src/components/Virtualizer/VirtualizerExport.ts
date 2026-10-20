'use client';

import {Virtualizer as VirtualizerEngine} from './Virtualizer';

/**
 * The engine as the entry point exports it: a binding of its own rather than a re-export.
 *
 * The lazy root of ListVirtualizer imports the engine too. A bundler that splits by files (esbuild)
 * sees through a re-export to the declaration, and the entry point of an app that imports only
 * ListVirtualizer would then load the engine — tanstack included — in a chunk shared with the lazy
 * root, before any list needs it. A binding of its own ends that path here while it is unused
 */
export const Virtualizer = VirtualizerEngine;
