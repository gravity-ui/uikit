import React from 'react';

import type {ListContextType} from '../../types';

export const ListContext = React.createContext<ListContextType<unknown> | null>(null);

export const useListContext = <T,>() => {
    const context = React.useContext(ListContext);

    if (!context) {
        throw new Error(
            'Trying to use "ListContext" out of scope. Ensure that you use "useListContext" hook inside "ListProvider"',
        );
    }

    return context as ListContextType<T>;
};
