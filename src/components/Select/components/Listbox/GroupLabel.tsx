import React from 'react';
import {block} from '../../../utils/cn';
import {SelectProps} from '../../types';

const b = block('select-listbox');

type GroupLabelProps = {
    size: NonNullable<SelectProps['size']>;
    label: string;
};

export const GroupLabel = ({size, label}: GroupLabelProps) => {
    return <div className={b('group-label', {size})}>{label}</div>;
};
