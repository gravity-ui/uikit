'use client';

import * as React from 'react';

import type {LayerConfig} from './LayerManager';

/** The layer the content is rendered in: a layer nested in it is always above it */
export const LayerContext = React.createContext<LayerConfig | null>(null);

/** The portal of the element, which also holds its focus guards and dismiss buttons, or the element itself */
export function getLayerElement(element: Element | null) {
    return element?.closest('[data-floating-ui-portal]') ?? element;
}
