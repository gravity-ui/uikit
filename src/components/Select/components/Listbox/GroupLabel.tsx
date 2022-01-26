import React from 'react';
import {block} from '../../../utils/cn';

const b = block('select-listbox');

type GroupLabelProps = {
    label: string;
};

export const GroupLabel = ({label}: GroupLabelProps) => {
    return (
        <div className={b('group-label')}>
            <div className={b('group-label-content')}>{label}</div>
        </div>
    );
};
