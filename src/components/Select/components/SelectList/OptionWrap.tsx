import React from 'react';

import {block} from '../../../utils/cn';
import type {SelectOption, SelectProps} from '../../types';

const b = block('select-list');

type DefaultOptionProps = {
    option: SelectOption;
};

type OptionWrapProps = {
    renderOption?: (option: SelectOption) => React.ReactElement;
    value: NonNullable<SelectProps['value']>;
    option: SelectOption;
    multiple?: boolean;
};

const DefaultOption = ({option}: DefaultOptionProps) => {
    const {content, children, disabled} = option;
    return <span className={b('option-default-label', {disabled})}>{content || children}</span>;
};

export const OptionWrap = (props: OptionWrapProps) => {
    const {renderOption, option} = props;

    const optionContent = renderOption ? renderOption(option) : <DefaultOption option={option} />;

    return optionContent;
};
