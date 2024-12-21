import {block} from '../../../utils/cn';
import type {SelectProps} from '../../types';

import './EmptyOptions.scss';

const b = block('select-empty-placeholder');

type EmptyPlaceholderProps = {
    renderEmptyOptions?: SelectProps['renderEmptyOptions'];
    filter: string;
};

export const EmptyOptions = ({renderEmptyOptions, filter}: EmptyPlaceholderProps) => {
    return <div className={b({empty: !renderEmptyOptions})}>{renderEmptyOptions?.({filter})}</div>;
};
