import {Xmark} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
import {SelectQa, selectClearBlock} from '../../constants';
import i18n from '../../i18n';
import type {SelectClearProps} from '../../types';

import './SelectClear.scss';

export const SelectClear = (props: SelectClearProps) => {
    const {size, onClick, onMouseEnter, onMouseLeave, renderIcon} = props;
    const {t} = i18n.useTranslation();
    const icon = renderIcon ? (
        renderIcon()
    ) : (
        <Icon className={selectClearBlock('clear')} data={Xmark} />
    );
    return (
        <button
            className={selectClearBlock({size})}
            aria-label={t('label_clear')}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            data-qa={SelectQa.CLEAR}
            type="button"
        >
            {icon}
        </button>
    );
};

SelectClear.displayName = 'SelectClear';
