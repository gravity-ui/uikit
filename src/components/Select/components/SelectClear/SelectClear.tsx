import React from 'react';
import {Icon} from '../../../Icon';
import {CrossIcon} from '../../../icons/CrossIcon';
import {selectClearBlock} from '../../constants';
import './SelectClear.scss';

type SelectClearIconProps = {
    size: 's' | 'm' | 'l' | 'xl';
    disabled?: boolean;
};

export type SelectClearProps = SelectClearIconProps & {
    onClick: (e: React.MouseEvent) => void;
    renderClearIcon?: (args?: SelectClearIconProps) => React.ReactNode;
};

export const SelectClear = (props: SelectClearProps) => {
    const {size, disabled, onClick, renderClearIcon} = props;
    const icon = renderClearIcon ? (
        renderClearIcon()
    ) : (
        <Icon className={selectClearBlock('clear', {disabled})} data={CrossIcon} />
    );
    return (
        <div
            className={selectClearBlock({size})}
            role="button"
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={onClick}
        >
            {icon}
        </div>
    );
};

SelectClear.displayName = 'SelectClear';
