import React from 'react';

import {blockNew} from '../../../utils/cn';
import i18n from '../../i18n';
import type {PaginationSize} from '../../types';

import './PaginationPageOf.scss';

const b = blockNew('pagination-page-of');

type Props = {
    size: PaginationSize;
    className?: string;
};

export const PaginationPageOf = ({size, className}: Props) => {
    return <div className={b({size}, className)}>{i18n('label_page-of')}</div>;
};
