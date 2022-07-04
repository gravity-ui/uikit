import React from 'react';
import {ToasterContext} from '../ToasterContext';

export function useToaster() {
    const {add, remove, update} = React.useContext(ToasterContext);

    return React.useMemo(
        () => ({
            add,
            remove,
            update,
        }),
        [add, remove, update],
    );
}
