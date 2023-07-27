import React from 'react';

import {Loader} from '../../../Loader/Loader';
import {selectListBlock} from '../../constants';

export const SelectLoadingIndicator = () => {
    return (
        <div className={selectListBlock('loading-indicator')}>
            <Loader />
        </div>
    );
};
