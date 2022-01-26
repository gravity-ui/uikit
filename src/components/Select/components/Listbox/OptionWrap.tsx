import React from 'react';
import {block} from '../../../utils/cn';
import {Icon} from '../../../Icon';
import {Tick} from '../../../icons/Tick';
import {SelectProps, SelectOption} from '../../types';

const b = block('select-listbox');

type DefaultOptionProps<T> = {
    option: SelectOption<T>;
};

type OptionWrapProps<T> = {
    renderOption?: SelectProps<T>['renderOption'];
    value: NonNullable<SelectProps['value']>;
    option: SelectOption<T>;
    multiple?: boolean;
};

const DefaultOption = <T extends unknown>({option}: DefaultOptionProps<T>) => {
    const {content, children, disabled} = option;
    return <span className={b('option-default-label', {disabled})}>{content || children}</span>;
};

export const OptionWrap = <T extends unknown>(props: OptionWrapProps<T>) => {
    const {renderOption, value, option, multiple} = props;
    const selected = value.indexOf(option.value) !== -1;
    const showTickIcon = selected && multiple;
    const optionContent = renderOption ? renderOption(option) : <DefaultOption option={option} />;

    return (
        <div className={b('option', {colored: selected && !multiple})}>
            {optionContent}
            {showTickIcon && <Icon className={b('tick-icon')} data={Tick} />}
        </div>
    );
};
