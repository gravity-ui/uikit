import React from 'react';
import {block} from '../../../utils/cn';
import {Icon} from '../../../Icon';
import {Tick} from '../../../icons/Tick';
import {SelectProps, SelectOption} from '../../types';

const b = block('select-listbox');

type OptionDefaultLabelProps = {
    label: string;
    disabled?: boolean;
};

type OptionWrapProps<T> = {
    renderOption?: SelectProps<T>['renderOption'];
    size: NonNullable<SelectProps['size']>;
    value: NonNullable<SelectProps['value']>;
    option: SelectOption<T>;
    multiple?: boolean;
};

const OptionDefaultLabel = ({label, disabled}: OptionDefaultLabelProps) => {
    return <span className={b('option-default-label', {disabled})}>{label}</span>;
};

export const OptionWrap = <T extends unknown>(props: OptionWrapProps<T>) => {
    const {renderOption, size, value, option, multiple} = props;
    const {label, disabled} = option;
    const selected = value.indexOf(option.value) !== -1;
    const showTickIcon = selected && multiple;
    const optionContent = renderOption ? (
        renderOption(option)
    ) : (
        <OptionDefaultLabel label={label} disabled={disabled} />
    );

    return (
        <div className={b('option', {size, colored: selected && !multiple})}>
            {optionContent}
            {showTickIcon && <Icon className={b('tick-icon')} data={Tick} />}
        </div>
    );
};
