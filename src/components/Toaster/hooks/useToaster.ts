import React from 'react';
import {ToasterContext} from '../Provider/ToasterContext';
import {ToasterPublicMethods} from '../types';

export function useToaster(): ToasterPublicMethods {
    const {add, remove, removeAll, update} = React.useContext(ToasterContext);

    return React.useMemo(
        () => ({
            add,
            createToast: add,
            remove,
            removeToast: remove,
            removeAll: removeAll,
            update,
            overrideToast: update,
        }),
        [add, remove, removeAll, update],
    );
}
