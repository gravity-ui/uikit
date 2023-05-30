import React from 'react';

import {InternalToastProps} from '../types';

export const ToastsContext = React.createContext<InternalToastProps[]>([]);
ToastsContext.displayName = 'ToastsContext';
