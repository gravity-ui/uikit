import React from 'react';

import {PromiseDialogContext} from './PromiseDialogContext';

export const usePromiseDialog = () => {
    return React.useContext(PromiseDialogContext);
};
