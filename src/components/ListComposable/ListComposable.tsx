import React from 'react';

import {ListContainer} from './components/ListContainer/ListContainer';
import {ListProvider} from './components/ListProvider/ListProvider';
import type {ListProviderProps} from './types';

export interface ListComposableProps<T> extends Omit<ListProviderProps<T>, 'children'> {
    children?: React.ReactNode;
}

export function ListComposable<T>({children, ...props}: ListComposableProps<T>) {
    return <ListProvider {...props}>{children || <ListContainer />}</ListProvider>;
}
