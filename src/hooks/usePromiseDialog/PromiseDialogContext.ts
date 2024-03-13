import React from 'react';

import type {PromiseDialogContextType} from './types';

export const PromiseDialogContext = React.createContext<PromiseDialogContextType>({
    openDialog: () => Promise.resolve({success: false}),
});
