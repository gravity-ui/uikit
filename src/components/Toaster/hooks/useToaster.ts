import {useContext, useMemo} from 'react';
import {ToasterContext} from '../ToasterContext';

export function useToaster() {
    const {add, remove, update} = useContext(ToasterContext);

    return useMemo(
        () => ({
            add,
            remove,
            update,
        }),
        [add, remove, update],
    );
}
