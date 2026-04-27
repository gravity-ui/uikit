import * as React from 'react';

import {Tab} from './Tab';
import type {TabComponentElementType, TabComponentProps, TabLinkProps, TabProps} from './types';

export function isTabComponentProps<T extends TabComponentElementType>(
    p: TabProps<T>,
): p is TabComponentProps<Exclude<T, undefined>> {
    return p.component !== undefined;
}

export function isTabLinkProps<T extends TabComponentElementType>(
    p: TabProps<T>,
): p is TabLinkProps {
    return p.href !== undefined;
}

/**
 * Finds the first Tab in the subtree (e.g. Tab wrapped in Tooltip) and returns it.
 */
export function getTabNodePropsFromReactNode(node: React.ReactNode): TabProps | undefined {
    if (!React.isValidElement(node)) {
        return undefined;
    }

    if (node.type === Tab) {
        return node.props as TabProps;
    }

    const props = node.props as {children?: React.ReactNode};
    if (props.children === null) {
        return undefined;
    }

    for (const child of React.Children.toArray(props.children)) {
        const nested = getTabNodePropsFromReactNode(child);
        if (nested !== undefined) {
            return nested;
        }
    }

    return undefined;
}
