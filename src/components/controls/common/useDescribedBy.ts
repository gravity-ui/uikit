import React from 'react';

import {getControlErrorTextId, getControlNoteId} from '../utils';

interface UseDescribedByArgs {
    ariaDescribedBy?: string;
    controlId?: string;
    note?: React.ReactNode;
    error?: React.ReactNode;
}

export const useDescribedBy = ({ariaDescribedBy, note, error, controlId}: UseDescribedByArgs) => {
    return React.useMemo(() => {
        const result = [];
        if (ariaDescribedBy) {
            result.push(ariaDescribedBy);
        }
        if (controlId) {
            if (note) {
                result.push(getControlNoteId(controlId));
            }

            if (error) {
                result.push(getControlErrorTextId(controlId));
            }
        }
        return result.join(' ');
    }, [ariaDescribedBy, controlId, note, error]);
};
