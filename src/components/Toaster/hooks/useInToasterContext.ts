import React from 'react';
import {ToasterContext} from '../Provider/ToasterContext';

export function useInToasterContext() {
    return React.useContext(ToasterContext).isInitialized;
}
