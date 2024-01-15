import React from 'react';

import type {AlertContextType} from './types';

export const AlertContext = React.createContext<AlertContextType | null>(null);
