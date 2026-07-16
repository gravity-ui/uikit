import type * as React from 'react';

import {mergeRefs} from '../../../hooks';
import {mergeProps} from '../../utils/mergeProps';

interface ComposableProps extends React.HTMLAttributes<HTMLElement> {
    ref?: React.Ref<HTMLElement>;
}

interface ComposeItemPropsOptions {
    /**
     * Замена дефолтного mergeRefs — например, мемоизированный форк,
     *  чтобы не пересоздавать ref-callback на каждый рендер
     */
    forkRef?: (
        base: React.Ref<HTMLElement>,
        override: React.Ref<HTMLElement>,
    ) => React.RefCallback<HTMLElement>;
}

/**
 * Контракт композиции props ядра листа с переопределениями (§2.6 плана):
 * - `on*`-обработчики — цепочкой, переданный вызывается после базового;
 * - `className` — конкатенация;
 * - `ref` — форк (оба ref'а получают узел);
 * - `style` — shallow-merge (ключи переопределения побеждают поштучно);
 * - ключи со значением `undefined` игнорируются (не затирают базу);
 * - остальные ключи — «последний побеждает».
 *
 * На этот контракт опираются слои виртуализации (style/ref) и dnd (props/ref).
 */
export function composeItemProps<P extends ComposableProps>(
    base: P,
    overrides?: ComposableProps,
    {forkRef = mergeRefs}: ComposeItemPropsOptions = {},
): P {
    if (!overrides) {
        return base;
    }

    const definedOverrides: ComposableProps = {};
    for (const [key, value] of Object.entries(overrides)) {
        if (value !== undefined) {
            (definedOverrides as Record<string, unknown>)[key] = value;
        }
    }

    const composed = mergeProps(base, definedOverrides) as P;

    if (base.style && definedOverrides.style) {
        composed.style = {...base.style, ...definedOverrides.style};
    }

    if (base.ref && definedOverrides.ref) {
        composed.ref = forkRef(base.ref, definedOverrides.ref);
    }

    return composed;
}
