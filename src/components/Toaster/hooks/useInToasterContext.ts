import {useContext} from 'react';
import {ToasterContext} from '../ToasterContext';

export function useInToasterContext() {
    return useContext(ToasterContext).isInitialized;
}
