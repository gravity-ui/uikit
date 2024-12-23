import {createContext} from 'react';

import type {ToasterContextMethods} from '../types';

export const ToasterContext = createContext<ToasterContextMethods | null>(null);
ToasterContext.displayName = 'ToasterContext';
