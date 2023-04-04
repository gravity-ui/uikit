import React from 'react';
import {blockNew as block} from '../../../utils/cn';

const b = block('select-list');

type GroupLabelProps = {
    label: string;
};

export const GroupLabel = ({label}: GroupLabelProps) => {
    return (
        <div className={b('group-label', {empty: label === ''})}>
            <div className={b('group-label-content')}>{label}</div>
        </div>
    );
};
