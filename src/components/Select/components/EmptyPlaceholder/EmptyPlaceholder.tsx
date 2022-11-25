import React from 'react';
import {block} from '../../../utils/cn';
import type {SelectProps} from '../../types';

import './EmptyPlaceholder.scss';

const b = block('select-empty-placeholder');

type EmptyPlaceholderProps = {
    content?: SelectProps['emptyPlaceholder'];
};

export const EmptyPlaceholder = ({content}: EmptyPlaceholderProps) => {
    return <div className={b({empty: !content})}>{content}</div>;
};
