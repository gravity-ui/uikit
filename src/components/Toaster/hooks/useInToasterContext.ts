import React from 'react';
import {ToasterContext} from '../ToasterContext';

export function useInToasterContext() {
    return React.useContext(ToasterContext).isInitialized;
}
