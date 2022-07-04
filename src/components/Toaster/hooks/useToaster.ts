import React from 'react';
import {ToasterContext} from '../ToasterContext';
import {ToasterRef} from '../types';

export function useToaster(): ToasterRef {
    const {add, remove, update} = React.useContext(ToasterContext);

    return React.useMemo(
        () => ({
            add,
            createToast: add,
            remove,
            removeToast: remove,
            update,
            overrideToast: update,
        }),
        [add, remove, update],
    );
}
