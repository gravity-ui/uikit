import React from 'react';

import {Loader} from '../../../Loader/Loader';
import {selectBlock} from '../../constants';

import './SelectLoadingIndicator.scss';

export const SelectLoadingIndicator = (props: {onRendered?: () => void}) => {
    React.useEffect(() => {
        props.onRendered?.();
    }, []);
    return (
        <div className={selectBlock('loading-indicator')}>
            <Loader />
        </div>
    );
};
