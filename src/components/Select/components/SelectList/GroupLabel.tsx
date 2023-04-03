import React from 'react';
import {blockNew as block} from '../../../utils/cn';

const b = block('select-list');

type GroupLabelProps = {
    label: string;
};

export const GroupLabel = ({label}: GroupLabelProps) => {
    const isEmpty = label === '';
    return (
        <div className={b('group-label', {empty: isEmpty})}>
            <div className={b('group-label-content')}>{label}</div>
        </div>
    );
};
