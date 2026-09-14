import type * as React from 'react';

import {mergeRefs} from '../../../hooks';
import {mergeProps} from '../../utils/mergeProps';

interface ComposableProps extends React.HTMLAttributes<HTMLElement> {
    ref?: React.Ref<HTMLElement>;
}

interface ComposeItemPropsOptions {
    /** A replacement for mergeRefs (a memoized fork), so that a ref callback is not recreated every render */
    forkRef?: (
        base: React.Ref<HTMLElement>,
        override: React.Ref<HTMLElement>,
    ) => React.RefCallback<HTMLElement>;
}

/**
 * The contract for composing the props of the list core with overrides:
 * - `on*` handlers are chained, the passed one runs after the base one;
 * - `className` is concatenated;
 * - `ref` is forked (both refs get the node);
 * - `style` is shallow-merged (override keys win one by one);
 * - keys whose value is `undefined` are ignored (they do not erase the base);
 * - the remaining keys follow "last one wins".
 */
export function composeItemProps<P extends ComposableProps>(
    base: P,
    overrides?: ComposableProps,
    {forkRef = mergeRefs}: ComposeItemPropsOptions = {},
): P {
    if (!overrides) {
        return base;
    }

    const definedOverrides: ComposableProps = Object.fromEntries(
        Object.entries(overrides).filter(([, value]) => value !== undefined),
    );

    const composed = mergeProps(base, definedOverrides) as P;

    if (base.style && definedOverrides.style) {
        composed.style = {...base.style, ...definedOverrides.style};
    }

    if (base.ref && definedOverrides.ref) {
        composed.ref = forkRef(base.ref, definedOverrides.ref);
    }

    return composed;
}
