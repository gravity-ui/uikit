import React from 'react';
import {PaginationSize} from '../../types';
import {blockNew} from '../../../utils/cn';
import i18n from '../../i18n';

import './PaginationPageOf.scss';

const b = blockNew('pagination-page-of');

type Props = {
    size: PaginationSize;
    className?: string;
};

export const PaginationPageOf = ({size, className}: Props) => {
    return <div className={b({size}, className)}>{i18n('label_page-of')}</div>;
};
