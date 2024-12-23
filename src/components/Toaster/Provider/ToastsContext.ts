import {createContext} from 'react';

import type {InternalToastProps} from '../types';

export const ToastsContext = createContext<InternalToastProps[]>([]);
ToastsContext.displayName = 'ToastsContext';
