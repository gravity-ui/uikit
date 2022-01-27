import React from 'react';
import {block} from '../../../utils/cn';
import {Icon} from '../../../Icon';
import {Tick} from '../../../icons/Tick';
import {SelectProps, SelectOption} from '../../types';

const b = block('select-listbox');

type DefaultOptionProps = {
    option: SelectOption;
};

type OptionWrapProps = {
    renderOption?: SelectProps['renderOption'];
    value: NonNullable<SelectProps['value']>;
    option: SelectOption;
    multiple?: boolean;
};

const DefaultOption = ({option}: DefaultOptionProps) => {
    const {content, children, disabled} = option;
    return <span className={b('option-default-label', {disabled})}>{content || children}</span>;
};

export const OptionWrap = (props: OptionWrapProps) => {
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
