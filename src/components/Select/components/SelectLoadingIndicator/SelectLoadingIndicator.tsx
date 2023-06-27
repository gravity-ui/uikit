import React from 'react';

import {Loader} from '../../../Loader/Loader';
import {selectBlock} from '../../constants';

import './SelectLoadingIndicator.scss';

export const SelectLoadingIndicator = () => {
    return (
        <div className={selectBlock('loading-indicator')}>
            <Loader />
        </div>
    );
};
