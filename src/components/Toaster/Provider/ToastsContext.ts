'use client';
import * as React from 'react';

import type {InternalToastProps} from '../types';

export const ToastsContext = React.createContext<InternalToastProps[]>([]);
ToastsContext.displayName = 'ToastsContext';
