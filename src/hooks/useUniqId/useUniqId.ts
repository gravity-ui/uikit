import * as React from 'react';

import {NAMESPACE} from '../../components/utils/cn';

export type UseUniqIdResult = string;

export const useUniqId: () => UseUniqIdResult = () => {
    // eslint-disable-next-line no-restricted-syntax
    return `${NAMESPACE}${React.useId()}`;
};
