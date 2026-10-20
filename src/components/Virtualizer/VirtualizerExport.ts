'use client';

import {Virtualizer as VirtualizerEngine} from './Virtualizer';

/**
 * A binding of its own rather than a re-export: esbuild sees through a re-export, and an app that
 * imports only ListVirtualizer would load the engine and tanstack with it in a chunk shared with the
 * lazy root
 */
export const Virtualizer = VirtualizerEngine;
