import {block} from '../../../utils/cn';
import i18n from '../../i18n';
import type {PaginationSize} from '../../types';

import './PaginationPageOf.scss';

const b = block('pagination-page-of');

type Props = {
    size: PaginationSize;
    className?: string;
};

export const PaginationPageOf = ({size, className}: Props) => {
    const {t} = i18n.useTranslation();
    return <div className={b({size}, className)}>{t('label_page-of')}</div>;
};
