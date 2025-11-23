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
