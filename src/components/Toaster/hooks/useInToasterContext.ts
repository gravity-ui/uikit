import {useContext} from 'react';

import {ToasterContext} from '../Provider/ToasterContext';

export function useInToasterContext() {
    return useContext(ToasterContext) !== null;
}
