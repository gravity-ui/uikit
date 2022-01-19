import React from 'react';
import {block} from '../utils/cn';
import {SelectProps} from './types';

const b = block('select');

export const Select = (_props: SelectProps) => {
    return <div className={b()}>Select component</div>;
};
