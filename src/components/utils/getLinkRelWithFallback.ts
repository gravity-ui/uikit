import type * as React from 'react';

export function getLinkRelWithFallback({
    target,
    rel,
}: Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'target' | 'rel'>) {
    return target === '_blank' && !rel ? 'noopener noreferrer' : rel;
}
