import * as React from 'react';

import {mergeProps} from '../utils/mergeProps';

import type {ComponentDefaultPropsMap} from './PrivateDefaultPropsProvider';
import {PrivateDefaultPropsContext} from './PrivateDefaultPropsProvider';

export function useDefaultProps<K extends keyof ComponentDefaultPropsMap, T extends object>(
    componentName: K,
    props: T,
): T {
    const ctx = React.useContext(PrivateDefaultPropsContext);
    const defaults = ctx[componentName];

    if (!defaults) {
        return props;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mergeProps(defaults as any, props as any) as unknown as T;
}
