import React from 'react';

import {Check} from '@gravity-ui/icons';

import {Icon} from '../../../Icon';
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
    newListView?: boolean;
};

const DefaultOption = ({option}: DefaultOptionProps) => {
    const {content, children, disabled} = option;
    return <span className={b('option-default-label', {disabled})}>{content || children}</span>;
};

export const OptionWrap = (props: OptionWrapProps) => {
    const {renderOption, value, option, multiple, newListView} = props;
    const selected = value.indexOf(option.value) !== -1;
    const optionContent = renderOption ? renderOption(option) : <DefaultOption option={option} />;

    if (newListView) {
        return optionContent;
    }

    return (
        <div
            data-qa={option.qa}
            className={b('option', {colored: selected && !multiple, disabled: option.disabled})}
        >
            {multiple && (
                <Icon className={b('tick-icon', {shown: selected && multiple})} data={Check} />
            )}
            {optionContent}
        </div>
    );
};
