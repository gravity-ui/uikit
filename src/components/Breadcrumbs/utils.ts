import * as React from 'react';

import {block} from '../utils/cn';

export const b = block('breadcrumbs');

/**
 * This is not a full hash, but a stable string that will change when:
 *  - the text changes at any level of nesting
 *  - the component type changes
 *  - primitive props change (className, title, href, etc.)
 *  - elements are added, removed, or reordered
 */
export function getReactNodeHash(children: React.ReactNode): string {
    const parts: string[] = [];

    React.Children.forEach(children, (child) => {
        if (child === null || child === undefined || typeof child === 'boolean') {
            return;
        }

        if (typeof child === 'string' || typeof child === 'number') {
            parts.push(String(child));
            return;
        }

        if (React.isValidElement(child)) {
            const type = child.type;
            const typeName =
                typeof type === 'string'
                    ? type
                    : (type as React.ComponentType)?.displayName ||
                      (type as React.ComponentType)?.name ||
                      '';
            parts.push(typeName);

            if (child.key !== null && child.key !== undefined) parts.push(String(child.key));

            const {children: nested, ...rest} = child.props as Record<string, unknown>;
            for (const [k, v] of Object.entries(rest)) {
                if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                    parts.push(`${k}:${v}`);
                }
            }

            if (nested) {
                parts.push(getReactNodeHash(nested as React.ReactNode));
            }
        }
    });

    return parts.join('|');
}
