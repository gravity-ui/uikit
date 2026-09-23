'use client';
import * as React from 'react';

import type {ListDndAdapter} from './types';

/**
 * The dnd adapter of the nearest List below, for a wrapper that owns the library (it cannot reach
 *  the `dnd` prop of a List passed to it as children). The `dnd` prop wins; a List does not pass
 *  the context on to the lists rendered inside its rows
 */
export const ListDndContext = React.createContext<ListDndAdapter | null>(null);
