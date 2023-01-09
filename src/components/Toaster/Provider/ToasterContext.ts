import React from 'react';

import type {ToasterContextMethods} from '../types';

export const ToasterContext = React.createContext<ToasterContextMethods | null>(null);
ToasterContext.displayName = 'ToasterContext';
