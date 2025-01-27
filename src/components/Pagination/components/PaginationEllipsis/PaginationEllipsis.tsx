import {block} from '../../../utils/cn';
import type {PaginationSize} from '../../types';

import './PaginationEllipsis.scss';

const b = block('pagination-ellipsis');

type Props = {
    size: PaginationSize;
    className?: string;
};

export const PaginationEllipsis = ({size, className}: Props) => {
    return <div className={b({size}, className)}>...</div>;
};
