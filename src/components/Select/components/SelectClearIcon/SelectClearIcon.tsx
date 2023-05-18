import React from 'react';
import {Icon} from '../../../Icon';
import {CrossIcon} from '../../../icons/CrossIcon';
import {selectClearBlock} from '../../constants';
import './SelectClearIcon.scss';

type SelectClearIconProps = {
    size: 's' | 'm' | 'l' | 'xl';
    disabled?: boolean;
    onClick: (e: React.MouseEvent) => void;
};

export const SelectClearIcon = (props: SelectClearIconProps) => {
    const {size, disabled, onClick} = props;
    return (
        <div
            className={selectClearBlock({size})}
            role="button"
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={onClick}
        >
            <Icon className={selectClearBlock('clear', {disabled})} data={CrossIcon} />
        </div>
    );
};

SelectClearIcon.displayName = 'SelectClearIcon';
